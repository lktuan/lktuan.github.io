# 25 Days of DAX challenge Ed3 on Northwind dataset

- Link to the challenge: <https://curbal.com/25-days-of-dax-fridays-challenge-edition-3>;
- DAX codes were formatted using DAXFormatter: <https://www.daxformatter.com/>;
- A brilliant No-CALCULATE solution by Brian Julius: <https://github.com/bjulius/No-CALCULATE-DAX>;
- Worth reading - The One DAX pattern to rule them all by Greg Deckler in [LinkedIn](https://www.linkedin.com/posts/gregdeckler_powerbi-microsoft-dax-activity-7056636983959322624-uxwY).

## Day 1: Which product had been ordered the most (in terms of quantity) ?

View the data on DAX query view:

```js
EVALUATE
SUMMARIZE (
    Products,
    Products[ProductID],
    Products[ProductName],
    "Qty", SUM ( Order_Details[Quantity] )
)
ORDER BY [Qty] DESC
```

We need to get the `TOPN()` **1**, and then `CONCATENATE()` all products that have largest order quantities (there is such scenario):

```js
D1 =
CONCATENATEX (
    TOPN (
        1,
        SUMMARIZE (
            Products,
            Products[ProductID],
            Products[ProductName],
            "Qty", SUM ( Order_Details[Quantity] )
        ),
        [Qty], DESC
    ),
    Products[ProductName],
    ", ",
    Products[ProductName], ASC
)
// Concat ProductName and order ascending by itself
```

The answer is: "Camembert Pierrot"!

> [!TIP]
>`CONCATENATE()` return string so if we want to run it in DAX query view, use the `ROW()` function:
>
>```js
>ROW("Top sales products", 
>// measure D1
>)
> ```

## Day 2: Which product have the highest average order size?

The average order size is calculated for each product based on the quantity of each order. We will first `SUMMARIZE()` to get distinct product and the average order quantity over Order Details table.

This time we will use the `ADDCOLUMNS()` to explicit the intention of adding more columns, which is more efficient (this is also a common pattern in DAX). Readmore: <https://www.sqlbi.com/articles/best-practices-using-summarize-and-addcolumns/>.

```js
D2 =
CONCATENATEX (
    TOPN (
        1,
        ADDCOLUMNS (
            SUMMARIZE ( Products, Products[ProductID], Products[ProductName] ),
            "Avg qty", CALCULATE ( AVERAGE ( Order_Details[Quantity] ) )
        ),
        [Avg qty], DESC
    ),
    Products[ProductName],
    ", ",
    Products[ProductName], ASC
)
```

And the answer is: "Schoggi Schokolade"!

## Day 3: What is highest average discount done to a product?

The solution is pretty similar to day 2, but this time we get the hight value instead of product name, we `FORMAT()` the value to text and select it by `SELECTCOLUMNS()`:

```js
D3 =
SELECTCOLUMNS (
    TOPN (
        1,
        ADDCOLUMNS (
            SUMMARIZE ( Products, Products[ProductID], Products[ProductName] ),
            "Avg discount", CALCULATE ( AVERAGE ( Order_Details[Discount] ) )
        ),
        [Avg discount], DESC
    ),
    "Highest average", FORMAT ( [Avg discount], "0.00%" )
)
```

The answer is: "25.00%"!

## Day 4: Top3 categories that have the highest revenue contribution?

We do not need to `DIVIDE()` as the solution provided by Curbal IMHO, it would be the same if we sort the absolute value.

We first create a measure to calculate the revenue post discount:

```js
Revenue after discount =
SUMX (
    Order_Details,
    Order_Details[Quantity] * Order_Details[UnitPrice] * ( 1 - Order_Details[Discount] )
)
```

And everything remained the same to previous question! We should sort descending by the revenue in the concatenated output rather than category name to show them in informative order.

```js
D4 =
CONCATENATEX (
    TOPN (
        3,
        ADDCOLUMNS (
            SUMMARIZE ( Categories, Categories[CategoryID], Categories[CategoryName] ),
            "Total revenue", CALCULATE ( [Revenue after discount] )
        ),
        [Total revenue], DESC
    ),
    Categories[CategoryName],
    ", ",
    [Total revenue], DESC
)
```

The answer is: "Beverages, Dairy Products, Confections"!

## Day 5: Average price of discontinued products?

We must get the (actual) unit price from the Order details table, not the Product table. The order price is even different order by order, so we need 2 steps:

- Calculate average order unit price (over all order) for all discontinued products;
- Calculate the average for all those average.

```js
D5 =
AVERAGEX (
    SUMMARIZE (
        FILTER ( Products, Products[Discontinued] = TRUE () ),
        Products[ProductID],
        Products[ProductName],
        "Avg unit price", AVERAGE ( Order_Details[UnitPrice] )
    ),
    [Avg unit price]
)
```

The answer is: 44.35!

## Day 6: Percentage of sales from discontinued products?

We will be reusing the Revenue post discount:

```js
D6 = 
DIVIDE(
    SUMX(
        FILTER(
        Products,
        Products[Discontinued] = TRUE()
        ),
        [Revenue after discount]
    ),
    [Revenue after discount] // This is a measure of SUMX itself
)
```

The answer is: 14.61%!

## Day 7: How many high-value orders were placed in 1997?

The Orders table, not the Order detail is the concerned table, we first calculate the average order revenue for all orders place in 1997. And then we filter the Orders table with 2 conditions: year of order date is 1997, and the revenue post discount is larger than average.

```js
D7 =
VAR Avg_order_rev_1997 =
    AVERAGEX (
        FILTER ( Orders, YEAR ( Orders[OrderDate] ) = 1997 ),
        [Revenue after discount]
    )
RETURN
    COUNTROWS (
        FILTER (
            Orders,
            [Revenue after discount] > Avg_order_rev_1997
                && YEAR ( Orders[OrderDate] ) = 1997
        )
    )
```

There are 145 high-value orders in the year 1997!

## Day 8: Number of orders delivered on time?

Curbal seems to prefer using `SUMMARIZE()` everywhere, I think the solution is relatively simple of `COUNTROWS()` after some `FILTER()`. Here is my initial solution:

```js
D8 =
COUNTROWS (
    FILTER (
        Orders,
        NOT ISBLANK ( Orders[ShippedDate] )
            && DATEDIFF ( Orders[RequiredDate], Orders[ShippedDate], DAY ) = 0
    )
)
```

I asked Claude 3.5 Sonnet to optimized this and he said the combination of `FILTER()` and `DATEDIFF()` might be expensive, his solution is:

```js
D8 = 
CALCULATE(
    COUNTROWS(Orders),
    Orders[ShippedDate] <> BLANK(),
    Orders[RequiredDate] = Orders[ShippedDate]
)
```

Cool! There is 3 such orders.

If we use the logic `Orders[RequiredDate] >= Orders[ShippedDate]`, there is 772 orders. IMHO I think this make more sense!

## Day 9: The single month with highest sales?

```js
D9 =
CONCATENATEX (
    TOPN (
        1,
        ADDCOLUMNS (
            SUMMARIZE ( 'Calendar', 'Calendar'[Year-Month] ),
            "Total rev", [Revenue after discount]
        ),
        [Revenue after discount], DESC
    ),
    'Calendar'[Year-Month],
    ", ",
    'Calendar'[Year-Month], ASC
)
```

Pretty simple, it's 1998-Apr!

## Day 10: Best sales (week) day for queso cabrales?

```js
D10 =
CONCATENATEX (
    TOPN (
        1,
        ADDCOLUMNS (
            SUMMARIZE ( 'Calendar', 'Calendar'[Day Name] ),
            "Queso Cabrales sales", CALCULATE ( [Revenue after discount], Products[ProductName] = "Queso Cabrales" )
        ),
        [Queso Cabrales sales], DESC
    ),
    'Calendar'[Day Name],
    ", ",
    'Calendar'[Day Name], ASC
)
```

This is an enhanced version from Claude 3.5 Sonnet:

```js
D10a = 
CALCULATE(
    MAX('Calendar'[Day Name]), // trickily put an aggregation function here!
    TOPN(
        1,
        VALUES('Calendar'[Day Name]),
        // Using VALUES() here effectively says "give me the distinct day names, then order them by the sales amount"
        CALCULATE(
            [Revenue after discount],
            Products[ProductName] = "Queso Cabrales"
        ),
        DESC
    )
)
```

Bravo Tuesday!

## Day 11: Customer with the highest customer lifespan?

I have walked around with the `VALUES()` magic but failed with the lifespan calculation.
Claude helped me with this, and if we can confidently ensure there is no duplicated company name for 2 different companies/customers,
this is a very concise solution:

```js
D11 =
CONCATENATEX (
    TOPN (
        1,
        VALUES ( Customers[CompanyName] ),
        CALCULATE ( MAX ( Orders[OrderDate] ) - MIN ( Orders[OrderDate] ) ), DESC
    ),
    Customers[CompanyName],
    ", "
)
```

The answer is: Richter Supermarkt! Love you.

## Day 12: Which customer had placed most orders?

This time I've successfully implemented this pattern!

```js
D12 =
TOPN (
    1,
    VALUES ( Customers[CompanyName] ),
    CALCULATE ( COUNT ( Orders[OrderID] ) ), DESC
)
```

This is Save-a-lot Markets!

## Day 13: Top 5 countries with the highest number of customers?

Quick check and I found that no customer in the Customers table did not order any order.
So we just need to care/count on the Customers table only. Quite straightforwar!

```js
D13 =
CONCATENATEX (
    TOPN (
        5,
        VALUES ( Customers[Country] ),
        CALCULATE ( COUNT ( Customers[CustomerID] ) ), DESC
    ),
    Customers[Country],
    ", ",
    CALCULATE ( COUNT ( Customers[CustomerID] ) ), DESC
)
```

I am in love with this pattern, the answer is: USA, Germany, France, Brazil, UK!

## Day 14: Which customer placed the highest value of order (sales) in 1997?

It's QUICK-Stop!

```js
D14 =
TOPN (
    1,
    VALUES ( Customers[CompanyName] ),
    CALCULATE ( [Revenue after discount], YEAR ( Orders[OrderDate] ) = 1997 ), DESC
)
```

## Day 15: Customer with the highest number of orders in one single month?

```js
D15 =
CONCATENATEX (
    TOPN (
        1,
        ADDCOLUMNS (
            SUMMARIZE ( Orders, Customers[CompanyName], 'Calendar'[Year-Month] ),
            "order_count", CALCULATE ( COUNT ( Orders[OrderID] ) )
        ),
        [order_count], DESC
    ),
    Customers[CompanyName],
    ", ",
    Customers[CompanyName], DESC
)
```

There are 3 customers have 5 orders in one single month: Bottom-Dollar Markets, Ernst Handel, and Save-a-lot Markets!

## Day 16: Employee with the highest average order value (in sales)?

```js
D16 =
TOPN (
    1,
    VALUES ( Employees[Full Name] ),
    CALCULATE ( DIVIDE ( [Revenue after discount], COUNT ( Orders[OrderID] ) ) ), DESC
)
// AVERAGEX wouldn't work here because the measure is already doing a sum across Order_Details
```

She is Anne Dodsworth.

## Day 17: Employee with the longest average processing order time?

It's also Dodsworth!

```js
D17 = 
TOPN(
    1,
    VALUES(Employees[Full Name]),
    CALCULATE( 
        AVERAGEX(
            FILTER(Orders, Orders[ShippedDate] <> BLANK()),
            DATEDIFF(Orders[OrderDate], Orders[ShippedDate], DAY)
        )
    ),
    DESC
)
```

## Day 18: Which employee has been in the company the longest?

```js
D18 = 
CONCATENATEX(
    TOPN(
        1,
        VALUES(Employees[Full Name]),
        CALCULATE( MIN( Employees[HireDate]) ),
        ASC
    ),
    Employees[Full Name],
    ", "
)
```

Janet Leverling!

## Day 19: Name of all Northwind managers?

Anyone who has an employee reporting to themself is a manager! They are Andrew Fuller, Nancy Davolio, Steven Buchanan.

```js
D19 =
CONCATENATEX (
    FILTER ( Employees, Employees[EmployeeID] IN VALUES ( Employees[ReportsTo] ) ),
    Employees[Full Name],
    ", ",
    Employees[Full Name], ASC
)
```

## Day 20: Which employee handle the most unique customers?

There is no direct relationship from Employees to Customers table, we will be working on the Orders table!

```js
D20 =
CONCATENATEX (
    TOPN (
        1,
        VALUES ( Employees[Full Name] ),
        CALCULATE ( DISTINCTCOUNT ( Orders[CustomerID] ) )
    ),
    Employees[Full Name],
    ", "
)
```

Margaret Peacock!

## Day 21: Number of suppliers that deliver more product items than average?

There are 16!

```js
D21 =
VAR supplier_n_product =
    ADDCOLUMNS (
        SUMMARIZE ( Suppliers, Suppliers[SupplierID], Suppliers[CompanyName] ),
        "count product", CALCULATE ( COUNT ( Products[CategoryID] ) )
    )
RETURN
    COUNTROWS (
        FILTER (
            supplier_n_product,
            [count product] > AVERAGEX ( supplier_n_product, [count product] )
        )
    )
```

## Day 22: Suppliers with most stocked-out products?

Confidently assumed there is no duplicated CompanyName haha:

```js
D22 =
CONCATENATEX (
    TOPN (
        1,
        VALUES ( Suppliers[CompanyName] ),
        CALCULATE ( COUNT ( Products[ProductID] ), Products[UnitsInStock] = 0 ), DESC
    ),
    Suppliers[CompanyName],
    ", "
)
```

The answer is: New Orleans Cajun Delights, Pavlova, Ltd., Plutzer Lebensmittelgroßmärkte AG, Formaggi Fortini s.r.l., and "G'day, Mate"!

## Day 23: Which supplier delivers the most expensive product?

We need to focus on the Products table which lists the current price rather than the Orders table contained sold items ~ historical price.

```js
D23 =
CONCATENATEX (
    TOPN (
        1,
        VALUES ( Suppliers[CompanyName] ),
        CALCULATE ( MAX ( Products[UnitPrice] ) ), DESC
    ),
    Suppliers[CompanyName],
    ", "
)
```

It's is Aux joyeux ecclésiastiques!

## Day 24: Which supplier has the highest category diversity?

Note that there is no relationship between Suppliers table and Categories table. So we will be using `CategoryID` in the Products table:

```js
D24 = 
CONCATENATEX (
    TOPN (
        1,
        VALUES ( Suppliers[CompanyName] ),
        CALCULATE ( COUNT ( Products[CategoryID] ) ), DESC
    ),
    Suppliers[CompanyName],
    ", "
)
```

It's Pavlova, Ltd., Plutzer Lebensmittelgroßmärkte AG.

## Day 25: Supplier with highest number of top 5 selling products?

We need to do 2 steps: listing top 5 selling products, and then filter the top 1 supplier that delivers:

```js
D25 = 
VAR Top_5_products = TOPN(
    5,
    VALUES(Products[ProductID]),
    [Revenue after discount]
)
RETURN
CONCATENATEX (
    TOPN (
        1,
        VALUES ( Suppliers[CompanyName] ),
        CALCULATE ( COUNT ( Products[ProductID] ), Products[ProductID] in Top_5_products ), DESC
    ),
    Suppliers[CompanyName],
    ", "
)
```

It's Gai pâturage! Yayyy we completed the challenge!

Happy learning!
