import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {chunk } from '../utils/arrayUtils';

/**
 * Renders Time Slots into columns determined by numberOfCols
 */
export function Slots({ timeSlots, numberOfCols, onSelectTimeSlot }: { timeSlots: string[], numberOfCols: number, onSelectTimeSlot: (val: string) => void }) {
  const cols: string[][] = chunk(timeSlots, numberOfCols);

  return (
    <Stack spacing={2} direction="row">
      {cols.map((col, i) => (
        <Stack key={i} spacing={2} direction="column">
          {col.map((slot, idx) => (
            <Button key={idx} variant="outlined" onClick={e => onSelectTimeSlot(slot)}>{slot}</Button>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
