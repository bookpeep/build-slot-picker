import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

type Periods = 'Morning' | 'Afternoon' | 'Evening';

interface TimeOfDayPickerProps {
  selected: Periods,
  onPeriodClick: (period: Periods) => void
}

export function TimeOfDayPicker({selected, onPeriodClick}: TimeOfDayPickerProps) {
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
