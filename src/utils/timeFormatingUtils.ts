import LuxonAdapter from "@date-io/luxon";

const luxon = new LuxonAdapter({ locale: 'en' });

/**
 * 
 * @param time Must be in 24 hours format 
 * @example
 * toShortTime("13:03")
 * // return "1:03 pm"
 * @returns short string
 */
function toShortTime(time: string): string {
  // TODO: input validation
  return luxon.parseISO(time).toLocaleString({ timeStyle: 'short' });
}

/**
 * Generate time slotes from fromHour (inclusive) to toHour (exlusive) with increments 
 * based on hourDivision
 * @param fromHour 
 * @param toHour 
 * @param hourDivision must be between 0 <= hourDivision < 1
 * @example
 * generateTimeSlots(1, 3, 0.5)
 * // returns ['01:00 am', '01:30 am', '02:00 am', '02:30 am']
 * @returns list of time slotes from fromHour (inclusive) to toHour (exlusive) with increments in minutes
 */
export function generateTimeSlots(fromHour: number, toHour: number, hourDivision: number): string[] {  
  // TODO: input validation
  const incrementInMinutes = Math.floor(hourDivision * 60); 
  const minutesWithinHour = [];
  for (let i = 0; i < 60; i+= incrementInMinutes) {
    minutesWithinHour.push(i);
  }
  
  const result = [];
  for (let hour = fromHour; hour < toHour; hour++) {
    for (let min of minutesWithinHour) {
      result.push(toShortTime(`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`))
    }
  }

  return result;
}