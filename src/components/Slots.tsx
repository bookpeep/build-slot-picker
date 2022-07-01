import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// FIXME: timeSlots must be divisable by numberOfCols otherwise some lots won't display
export function Slots({ timeSlots, numberOfCols, onSelectTimeSlot }: { timeSlots: string[], numberOfCols: number, onSelectTimeSlot: (val: string) => void }) {

  // TODO: messy code, improve readibility 
  const cols: string[][] = [];
  let colIndex = 0;
  for (let col = 0; col < timeSlots.length; col += Math.floor(timeSlots.length / numberOfCols)) {
    cols[colIndex] = [];
    for (let i = col; i < col + Math.floor(timeSlots.length / numberOfCols); i++) {
      cols[colIndex].push(timeSlots[i]);
    }
    colIndex++;
  }

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
