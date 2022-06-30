import LuxonAdapter from "@date-io/luxon";

const luxon = new LuxonAdapter({ locale: 'en' });

// TODO: I did not address time zone concerns
export function foo(time: string): string {
  const temp = luxon.parseISO(time).toLocaleString({ timeStyle: 'short' })
  return temp;
}