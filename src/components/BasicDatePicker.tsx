import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LuxonAdapter from "@date-io/luxon";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { SlotSelect } from './SlotSelect';
import { Slots } from './Slots';
import { DateTime } from 'luxon';

const weekStartsOn = 7 // 1 => Monday, 1 => Tuesday, ... , 7 => Sunday

function startOfWeek(date: DateTime): DateTime {
  const jsDate = date.toJSDate();
  const day = jsDate.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn
  jsDate.setDate(jsDate.getDate() - diff)
  jsDate.setHours(0, 0, 0, 0)
  return DateTime.fromJSDate(jsDate);
}

class AdapterLuxonFacade extends LuxonAdapter {
  
  override getWeekdays: () => string[] = () => {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }

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
          return startOfWeek(startOfMonth).plus({ days: day });
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

export interface TimeSlots {
  morning: string[]
  afternoon: string[]
  evening: string[]
}

export function BasicDatePicker({ timeSlots, setDate, setTimeSlot }: { timeSlots: TimeSlots, setDate: any, setTimeSlot: any }) {
  const [value, setValue] = React.useState<Date | null>(null);

  const morningSlots = <Slots timeSlots={timeSlots.morning} numberOfCols={4} onSelectTimeSlot={setTimeSlot} />
  const afternoonSlots = <Slots timeSlots={timeSlots.afternoon} numberOfCols={4} onSelectTimeSlot={setTimeSlot} />
  const eveningSlots = <Slots timeSlots={timeSlots.evening} numberOfCols={4} onSelectTimeSlot={setTimeSlot} />

  return (
     <LocalizationProvider  dateAdapter={AdapterLuxonFacade} >
      <StaticDatePicker
        label="Pick a time slot"
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
          setDate(newValue.toISODate())
        }}
        renderInput={(params) => <TextField {...params} />}
      />

      <SlotSelect morningSlots={morningSlots} afterNoonSlots={afternoonSlots} eveningSlots={eveningSlots} />
    </LocalizationProvider>
  );
}



