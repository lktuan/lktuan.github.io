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

The average order size is calculated for each product base on the quantity of each order. We will first `SUMMARIZE()` to get distinct product and get average order quantity over Order Details table.

This time we will use the `ADDCOLUMNS()` to explicit the tention of adding more columns, and it is more efficient (this is also a common pattern in DAX).

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
