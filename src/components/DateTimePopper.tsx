import * as React from 'react';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import { TimeSlots, BasicDatePicker } from './BasicDatePicker';



export function DateTimePopper(props: { timeSlots: TimeSlots; setDate: any; setTimeSlot: any; }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <BasicDatePicker timeSlots={props.timeSlots} setDate={props.setDate} setTimeSlot={props.setTimeSlot} />
        <Button variant="contained" onClick={handleClick}>Apply</Button>
      </Popper>
    </div>
  );
}
