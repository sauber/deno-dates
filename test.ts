import { assertEquals } from "@std/assert";
import {
  type Bar,
  barToDate,
  type DateFormat,
  dateFromWeekday,
  dateToBar,
  diffDate,
  nextDate,
  range,
  today,
  weekdayFromDate,
} from "./mod.ts";

Deno.test("today", () => {
  assertEquals(today(), new Date().toISOString().substring(0, 10));
});

Deno.test("diffDate", () => {
  assertEquals(diffDate("2024-02-26", "2024-03-01"), 4);
});

Deno.test("nextDate", () => {
  assertEquals(nextDate("2024-02-26", 4), "2024-03-01");
});

Deno.test("prevDate", () => {
  assertEquals(nextDate("2024-03-01", -4), "2024-02-26");
});

Deno.test("range", () => {
  assertEquals(
    range("2024-02-26", "2024-03-01"),
    ["2024-02-26", "2024-02-27", "2024-02-28", "2024-02-29", "2024-03-01"],
  );
});

Deno.test("Name of weekday", () => {
  assertEquals(weekdayFromDate("2024-02-26"), "Monday");
});

Deno.test("Most recent date on weekday", () => {
  const cur: DateFormat = "2024-02-28"; // Wednesday
  assertEquals(dateFromWeekday(cur, 1), "2024-02-26"); // Monday
  assertEquals(dateFromWeekday(cur, 0), "2024-02-25"); // Sunday
  assertEquals(dateFromWeekday(cur, 6), "2024-02-24"); // Saturday
});

Deno.test("Convert Date to Bar", () => {
  const cur: DateFormat = "2025-01-07";
  const now: DateFormat = today();
  const days = diffDate(cur, now);
  const bar: number = dateToBar(cur);
  assertEquals(bar, days);
});

Deno.test("Convert Bar to Date", () => {
  const bar: Bar = 1;
  const now: DateFormat = today();
  const date: DateFormat = barToDate(bar);
  const days: number = diffDate(date, now);
  assertEquals(days, bar);
});
