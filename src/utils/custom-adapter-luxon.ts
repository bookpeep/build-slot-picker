import LuxonAdapter from "@date-io/luxon";
import { DateTime } from 'luxon';

const weekStartsOn = 7 // 1 => Monday, 1 => Tuesday, ... , 7 => Sunday

export class CustomAdapterLuxon extends LuxonAdapter {

  private static startOfWeek(date: DateTime): DateTime {
    const jsDate = date.toJSDate();
    const day = jsDate.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn
    jsDate.setDate(jsDate.getDate() - diff)
    jsDate.setHours(0, 0, 0, 0)
    return DateTime.fromJSDate(jsDate);
  }

  override getWeekdays: () => string[] = () => {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  };

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
