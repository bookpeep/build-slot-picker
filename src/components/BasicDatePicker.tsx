import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { SlotSelect } from './SlotSelect';
import { Slots } from './Slots';

export interface TimeSlots {
  morning: string[]
  afternoon: string[]
  evening: string[]
}

export function BasicDatePicker({timeSlots, setDate, setTimeSlot}: {timeSlots: TimeSlots, setDate: any, setTimeSlot: any}) {
  const [value, setValue] = React.useState<Date | null>(null);

  const morningSlots = <Slots timeSlots={timeSlots.morning} numberOfCols={4} onSelectTimeSlot={setTimeSlot}/>
  const afternoonSlots = <Slots timeSlots={timeSlots.afternoon} numberOfCols={4} onSelectTimeSlot={setTimeSlot}/>
  const eveningSlots = <Slots timeSlots={timeSlots.evening} numberOfCols={4} onSelectTimeSlot={setTimeSlot}/>

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <StaticDatePicker
        label="Basic example"
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



