/** format of date */
// Example 2022-02-10
// TODO: Fix error: Type '"2022-02-04"' is not assignable to type '"${number}-${number}-${number}"'
//export type DateFormat = "${string}-${string}-${string}";
export type DateFormat = string;

/** Number of days from date in the past until to today. */
export type Bar = number;


class DateCache {
  static #instance: DateCache;

  /** Bi-directional linked list of sequential dates */
  static #nextDateCache: Record<DateFormat, DateFormat> = {};
  static #prevDateCache: Record<DateFormat, DateFormat> = {};

  private constructor() {}

  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static get instance(): DateCache {
    if (!DateCache.#instance) {
      DateCache.#instance = new DateCache();
    }
    return DateCache.#instance;
  }

  /** Calculate or lookup next date */
  public DateInc(date: DateFormat): DateFormat {
    /** Next date */
    if (!(date in DateCache.#nextDateCache)) {
      DateCache.#nextDateCache[date] = formatDate(new Date(date).getTime() + 86400000);
    }
    const next: DateFormat = DateCache.#nextDateCache[date];

    /** Store reverse pair */
    if (!(next in DateCache.#prevDateCache)) DateCache.#prevDateCache[next] = date;

    return next;
  }

  /** Calculate or lookup previous date */
  public DateDec(date: DateFormat): DateFormat {
    /** Next date */
    if (!(date in DateCache.#prevDateCache)) {
      DateCache.#prevDateCache[date] = formatDate(new Date(date).getTime() - 86400000);
    }
    const prev: DateFormat = DateCache.#prevDateCache[date];

    /** Store reverse pair */
    if (!(prev in DateCache.#nextDateCache)) DateCache.#nextDateCache[prev] = date;

    return prev;
  }
}

/** Date number of days away */
export function nextDate(date: DateFormat, days = 1): DateFormat {
  if (days == 1) return DateCache.instance.DateInc(date);
  else if (days > 1) return nextDate(DateCache.instance.DateInc(date), days - 1);
  else if (days == -1) return DateCache.instance.DateDec(date);
  else if (days < -1) return nextDate(DateCache.instance.DateDec(date), days + 1);
  else return date;
}

/** Number of days from start to end date */
export function diffDate(start: DateFormat, end: DateFormat): number {
  return (new Date(end).getTime() - new Date(start).getTime()) / 86400000;
}

/** DateFormat object as string */
export function formatDate(ms: number): DateFormat {
  const date = new Date(ms);
  const yyyymmdd = date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) as DateFormat;
  return yyyymmdd;
}

/** Convert date to milliseconds */
export function msDate(date: DateFormat): number {
  return new Date(date).getTime();
}

// Todays date
export function today(): DateFormat {
  return formatDate(new Date().getTime());
}

/** A range of dates including start and end dates */
export function range(start: DateFormat, end: DateFormat): Array<DateFormat> {
  const dates = [];
  while (true) {
    dates.push(start);
    if (start == end) break;
    start = DateCache.instance.DateInc(start);
  }
  return dates;
}

/** Convert date to name of weekday */
export function weekdayFromDate(dateString: DateFormat): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

/** Find most recent prior date on weekday */
export function dateFromWeekday(
  dateString: DateFormat,
  weekday: number,
): DateFormat {
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  const offset = (7 + dayIndex - weekday) % 7;
  const wanted: DateFormat = nextDate(dateString, -offset);
  return wanted;
}

export function dateToBar(date: DateFormat): number {
  return diffDate(date, today());
}

export function barToDate(bar: number): DateFormat {
  return nextDate(today(), -bar);
}
