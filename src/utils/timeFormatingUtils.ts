import LuxonAdapter from "@date-io/luxon";

const luxon = new LuxonAdapter({ locale: 'en' });

/**
 * 
 * @param time Must be in 24 hours format 
 * @example
 * // return "1:03 pm"
 * toShortTime("13:03")
 * @returns short string
 */
export function toShortTime(time: string): string {
  
  // TODO: input validation

  const temp = luxon.parseISO(time).toLocaleString({ timeStyle: 'short' })
  return temp;
}

/**
 * Generate time slotes from fromHour (inclusive) to toHour (exlusive) with increments 
 * based on hourDivision
 * @param fromHour 
 * @param toHour 
 * @param hourDivision must be between 0 <= hourDivision < 1
 * @returns 
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