# 25 Days of DAX challenge Ed3 on Northwind dataset

Link: <https://curbal.com/25-days-of-dax-fridays-challenge-edition-3>.

## Day 1: Which product had been ordered the most (in terms of quantity) ?

View the data on DAX query view:

```js
EVALUATE
SUMMARIZE(
	Products, Products[ProductID], Products[ProductName],
	"Qty", SUM(Order_Details[Quantity])
    )
ORDER BY
[Qty] DESC
```

We need to get the `TOPN()` **1**, and then `CONCATENATE()` all products that have largest order quantities (there is such scenario):

```js
D1 = CONCATENATEX(
	TOPN(1,
		SUMMARIZE(
			Products, Products[ProductID], Products[ProductName],
			"Qty", SUM(Order_Details[Quantity])),
		[Qty], DESC
	),
	Products[ProductName], ", ", Products[ProductName], ASC) // Concat ProductName and order ascending by itself
```

The answer is: "Camembert Pierrot"!

> [!TIP]
> `CONCATENATE()` return string so if we want to run it in DAX query view, use the `ROW()` function:
> ```sql
> ROW("Top sales products", 
> -- measure D1
> )
> ```

## Day 2: Which product have the highest average order size?

The average order size is calculated for each product based on the quantity of each order. We will first `SUMMARIZE()` to get distinct product and the average order quantity over Order Details table.

This time we will use the `ADDCOLUMNS()` to explicit the intention of adding more columns, which is more efficient (this is also a common pattern in DAX). Readmore: <https://www.sqlbi.com/articles/best-practices-using-summarize-and-addcolumns/>.

```js
D2 = CONCATENATEX(
	TOPN(1,
		ADDCOLUMNS(
			SUMMARIZE(
				Products, 
				Products[ProductID], 
				Products[ProductName]
			),
			"Avg qty", CALCULATE(AVERAGE(Order_Details[Quantity]))
		),
	[Avg qty], DESC
	),
	Products[ProductName], ", ", Products[ProductName], ASC
)
```

And the answer is: "Schoggi Schokolade"!

## Day 3: What is highest average discount done to a product?

The solution is pretty similar to day 2, but this time we get the hight value instead of product name, we `FORMAT()` the value to text and select it by `SELECTCOLUMNS()`:

```js
D3 = SELECTCOLUMNS(
	TOPN(1,
		ADDCOLUMNS(
			SUMMARIZE(
				Products, 
				Products[ProductID], 
				Products[ProductName]
			),
			"Avg discount", CALCULATE(AVERAGE(Order_Details[Discount]))
		),
	[Avg discount], DESC
	),
    "Highest average", FORMAT( [Avg discount], "0.00%")
)
```
The answer is: "25.00%"!

## Day 4: Top3 categories that have the highest revenue contribution?

We do not need to `DIVIDE()` as the solution provided by Curbal IMHO, it would be the same if we sort the absolute value.

We first create a measure to calculate the revenue post discount:

```js
Revenue after discount = SUMX(Order_Details, Order_Details[Quantity] * Order_Details[UnitPrice] * (1 - Order_Details[Discount]))
```

And everything remained the same to previous question! We should sort descending by the revenue rather than category name to show them in informative order.

```js
D4 = CONCATENATEX(
	TOPN(3,
		ADDCOLUMNS(
			SUMMARIZE(
				Categories, 
				Categories[CategoryID], 
				Categories[CategoryName]
			),
			"Total revenue", CALCULATE([Revenue after discount])
		),
	[Total revenue], DESC
	),
	Categories[CategoryName], ", ", [Total revenue], DESC
)
```

The answer is: "Beverages, Dairy Products, Confections"!
