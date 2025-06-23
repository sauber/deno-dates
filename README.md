# deno-dates
A library of functions to work with dates in iso8601 format

## Examples
```typescript
import { type Bar, barToDate, type DateFormat, dateFromWeekday, dateToBar, diffDate, formatDate, nextDate, range, today, weekdayFromDate } from "jsr:@sauber/dates";

// Current date. Result such as "2025-06-23"
const now: DateFormat = today();

// Next Date. Result is "2025-06-24"
const tomorrow: DateFormat = nextDate("2025-06-23");

// Date in N number of days. Result is "2025-09-21"
const later: DateFormat = nextDate("2025-06-23", 90);

// Previous Date. Result is "2025-06-22"
const yesterday: DateFormat = nextDate("2025-06-23", -1);

// Date N number of days ago. Result is "2025-03-25"
const before: DateFormat = nextDate("2025-06-23", -90);

// Number of days between first and second date. Result is 90
const days: number = diffDate("2025-03-25", "2025-06-23");

// Number of days is negative when first date is later than second. Result is -90
const minus: number = diffDate("2025-06-23", "2025-03-25");

// Convert number of milliseconds since Epoch to formatted date. Result is "2025-06-23"
const formatted: DateFormat = formatDate(1750662633346);

// Range of dates including start and end.
// Result is [ "2024-02-27", "2024-02-28", "2024-02-29", "2024-03-01" ]
const dates: DateFormat[] = range("2024-02-27", "2024-03-01");

// Convert date to name of weekday: Result is "Monday"
const weekday: string = weekdayFromDate("2025-06-23");

// Most recent weekday prior to date. Result is "2025-06-20"
const friday: DateString = dateFromWeekday("2025-06-23", 5);

// Current number of days since date. Result such as 3
const bar: Bar = dateToBar("2025-06-20");

// Date current number of days ago. Result such as "2025-06-20"
const date: DateFormat = barToDate(3);
```