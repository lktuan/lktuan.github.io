# 25 Days of DAX challenge Ed3 on Northwind dataset

## Day 1: Which product had been ordered the most (in terms of quantity) ?

View the data on DAX query view:

```sql
EVALUATE
SUMMARIZE(
	Products, Products[ProductID], Products[ProductName],
	"Qty", SUM(Order_Details[Quantity])
    )
ORDER BY
[Qty] DESC
```

We need to get the `TOPN()` **1**, and then `CONCATENATE()` all products that have largest order quantities (there is such scenario):

```sql
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
