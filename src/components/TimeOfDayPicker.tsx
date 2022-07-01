import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';

type Periods = 'Morning' | 'Afternoon' | 'Evening';

interface TimeOfDayPickerProps {
  selected: Periods,
  onPeriodClick: (period: Periods) => void
}

export function TimeOfDayPicker({ selected, onPeriodClick }: TimeOfDayPickerProps) {
  // TODO: Use localization framework instead of hardcoding strings 
  // TODO: Add icons
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => onPeriodClick('Morning')}>Morning</Button>
      <Button onClick={() => onPeriodClick('Afternoon')}>Afternoon</Button>
      <Button onClick={() => onPeriodClick('Evening')}>Evening</Button>
    </ButtonGroup>
  );
}

// FIXME: timeSlots must be divisable by numberOfCols otherwise some lots won't display
export function Slots({ timeSlots, numberOfCols }: { timeSlots: string[], numberOfCols: number }) {

  // TODO: messy code, improve readibility 
  const cols: string[][] = [];
  let colIndex = 0;
  for (let col = 0; col < timeSlots.length; col += Math.floor(timeSlots.length / numberOfCols)) {
    cols[colIndex] = [];
    for (let i = col; i < col + Math.floor(timeSlots.length / numberOfCols); i++) {
      cols[colIndex].push(timeSlots[i]);
    }
    console.log(cols[colIndex])
    colIndex++;
  }

  return (
    <Stack spacing={2} direction="row">
      {cols.map(col => (
        <Stack spacing={2} direction="column">
          {col.map((slot, idx) => (
            <Button key={idx} variant="outlined">{slot}</Button>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
