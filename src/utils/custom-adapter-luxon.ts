import LuxonAdapter from "@date-io/luxon";
import { DateTime } from 'luxon';

const weekStartsOn = 7 // 1 => Monday, 1 => Tuesday, ... , 7 => Sunday

/**
 * Custom luxon adapter to address https://github.com/moment/luxon/issues/373
 */
export class CustomAdapterLuxon extends LuxonAdapter {

  /**
   * This is copied straight from https://github.com/date-fns/date-fns/blob/master/src/startOfWeek/index.ts
   * @param date luxon DateTime object
   * @returns start of the week for given date. it's always starts on Sunday
   */
  private static startOfWeek(date: DateTime): DateTime {
    const jsDate = date.toJSDate();
    const day = jsDate.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn
    jsDate.setDate(jsDate.getDate() - diff)
    jsDate.setHours(0, 0, 0, 0)
    return DateTime.fromJSDate(jsDate);
  }

  /**
   * For Kuwait, week starts on Sunday
   * Alternatively, we can refactor this to honor the current locale rather than fixed. 
   * @returns array of weekday names
   */
  override getWeekdays: () => string[] = () => {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  };

  /**
   * this is exactly the same implementation of the overrident method. 
   * The only different is how we get the start of the week. 
   * I replaced `startOf('week')` with `CustomAdapterLuxon.startOfWeek` 
   */
  override getWeekArray = (date: DateTime) => {
    const { days } = date
      .endOf("month")
      .endOf("week")
      .diff(date.startOf("month").startOf("week"), "days")
      .toObject();

    const weeks: DateTime[][] = [];
    new Array<number>(Math.round(days!))
      .fill(0)
      .map((_, i) => i)
      .map(
        (day) => {
          const startOfMonth = date.startOf("month");
          return CustomAdapterLuxon.startOfWeek(startOfMonth).plus({ days: day });
        }
      )
      .forEach((v, i) => {
        if (i === 0 || (i % 7 === 0 && i > 6)) {
          weeks.push([v]);
          return;
        }

        weeks[weeks.length - 1].push(v);
      });

    return weeks;
  };
}
