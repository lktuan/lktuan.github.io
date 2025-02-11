# 25 Days of DAX challenge Ed3 on Northwind dataset

Link: <https://curbal.com/25-days-of-dax-fridays-challenge-edition-3>;

DAX codes were formatted using DAXFormatter: <https://www.daxformatter.com/>.

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
