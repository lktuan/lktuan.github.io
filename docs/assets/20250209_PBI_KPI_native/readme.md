# Native KPI cards in Power BI by PBI Park

Link: <https://www.youtube.com/watch?v=rbWZllXMGYU>.

In this lesson, I learnt:

## Using Card (new), or stacked/clustered bar/column charts to create many informative KPI visual

1. Card native have **reference labels** that we can utilize to make number showed more informative (for eg., percentage of growth compared to `SAMEPERIODLASTYEAR()`);
2. Those **Value** and **Reference labels** can be show as **Title** and **Sub-title** in stacked/clustered bar/column charts;
3. We can utilize bar/column charts to create horizontal, vertical **dumbbell charts** and **tornado chart**, it is just trickily create supported measures;
4. Design the supported trend/comparison charts for KPI number the **minimal ways**.

## Using DAX to create supported measures

1. DAX can return a **string**:

```sql
_Past Year Subtitle Text = 
FORMAT([_ YoY %], "+0.0%;-0.0%;0.0%")
    & " vs. " &
    SELECTEDVALUE('Date'[Year]) -1
```

2. And **formatting**: `_Bar Color = IF([__Current Year] - [__Past Year] > 0, "#8CB400", "#0E64C5")`;
3. And **icons/images**: `_dot bar dot = if([Delta] < 0, "🟢")`.

## Recipes to be re-used

1. Date template:

```sql
DateAutoTemplate = 
--  
--     Configuration
--  
VAR __FirstDayOfWeek = 0
----------------------------------------
VAR __WeekDayCalculationType = IF ( __FirstDayOfWeek = 0, 7, __FirstDayOfWeek ) + 10
VAR __Calendar = 
    VAR __FirstYear = 2020
    VAR __LastYear = 2024
    RETURN CALENDAR (
        DATE ( __FirstYear, 1, 1 ),
        DATE ( __LastYear, 12, 31 )
    )
VAR __Step3 = 
    GENERATE (
        __Calendar,
        VAR __IsStandardLocale = IF ( FORMAT( DATE( 2000, 1, 1 ), "oooo" ) = "oooo", TRUE, FALSE )
        VAR __MonthFormatString = IF( __IsStandardLocale, "mmm", "ooo" )
        VAR __DayFormatString = IF( __IsStandardLocale, "ddd", "aaa" )
        VAR __LastTransactionDate = TODAY()
        VAR __Date = [Date]
        VAR __YearNumber = YEAR ( __Date )
        VAR __QuarterNumber = QUARTER ( __Date )
        VAR __YearQuarterNumber = CONVERT ( __YearNumber * 4 + __QuarterNumber - 1, INTEGER )
        VAR __MonthNumber = MONTH ( __Date )
        VAR __WeekDayNumber = WEEKDAY ( __Date, __WeekDayCalculationType )
        VAR __WeekDay = FORMAT ( __Date, __DayFormatString )
        RETURN ROW ( 
            "Year", __YearNumber,
            "Year Quarter Number", __YearQuarterNumber,
            "Year Quarter", FORMAT ( __QuarterNumber, "\Q0" ) & "-" & FORMAT ( __YearNumber, "0000" ),
            "Quarter", FORMAT( __QuarterNumber, "\Q0" ),
            "Year Month", FORMAT ( __Date, __MonthFormatString & " yyyy" ),
            "Year Month Number", __YearNumber * 12 + __MonthNumber - 1,
            "Month", FORMAT ( __Date, __MonthFormatString ),
            "Month Number", __MonthNumber,
            "Day of Week Number", __WeekDayNumber,
            "Day of Week", __WeekDay,
            "DateWithTransactions", __Date <= __LastTransactionDate 
        )
    )
RETURN
    __Step3
```

2. Month letter:

```sql
Month Letter = 
SWITCH(
    MONTH('Date'[Date]),
    1, "J",
    2, "F",
    3, "M",
    4, "A",
    5, "M" & UNICHAR(8201), // Second Occurrence
    6, "J" & UNICHAR(8202), // Second Occurrence
    7, "J" & UNICHAR(8201), // Third Occurrence
    8, "A" & UNICHAR(8201), // Second Occurrence
    9, "S",
    10, "O",
    11, "N",
    12, "D"
)
```

3. Show the value of the last month available in context only:

```sql
Last Month Value = 
-- Step 1: Create a table of month values
VAR Vals =
    CALCULATETABLE(
        ADDCOLUMNS(
            SUMMARIZE('Date', 'Date'[Month Number], 'Date'[Month Letter]),  -- Creates a distinct list of months with their numbers and letters
            "@Measure", [__Current Year]  -- Adds a column with the Current Year measure value for each month
        ),
        ALLSELECTED()  -- Removes any existing filter context to get all available months
    )

-- Step 2: Find the last non-blank value
VAR LastValue =
    CALCULATE(
        [__Current Year],  -- Calculate the Current Year measure
        LASTNONBLANK(Vals, [__Current Year])  -- Get the last month that has a non-blank value
    )

-- Step 3: Get current values for comparison
VAR CurrentValue = [__Current Year]  -- Store the current measure value
VAR CurrentMonth = SELECTEDVALUE('Date'[Month Number])  -- Get the currently selected month number

-- Step 4: Return final result
RETURN
    IF(CurrentValue = LastValue,  -- Compare if current value equals the last non-blank value
       CurrentValue,  -- If equal, return the current value
       BLANK())      -- If not equal, return blank
```
