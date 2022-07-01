import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { BasicDatePicker } from "./components/BasicDatePicker";
import { generateTimeSlots } from "./utils/timeFormatingUtils";
import { SlotSelect } from "./components/SlotSelect";
import { Slots } from "./components/Slots";

// Assume data arrives like this

// {
//   morning: ["10:00 am", "10:15 am", "10:30 am", "10:45 am", "11:00 am"],
//   afternoon: ["12:00 pm", "12:15 pm", "12:30 pm", "12:45 pm", "01:00 pm"],
//   evening: ["08:00 pm", "08:15 pm", "08:30 pm", "08:45 pm", "09:00 pm"],
// };

const timeSlots = {
  morning: generateTimeSlots(8, 12, .25),
  afternoon: generateTimeSlots(12, 16, 0.25),
  evening: generateTimeSlots(16, 20, 0.25)
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlot, setTimeSlot] = useState<string | null>(null);

  const morningSlots = <Slots timeSlots={timeSlots.morning} numberOfCols={4} onSelectTimeSlot={setTimeSlot}/>
  const afternoonSlots = <Slots timeSlots={timeSlots.afternoon} numberOfCols={4} onSelectTimeSlot={setTimeSlot}/>
  const eveningSlots = <Slots timeSlots={timeSlots.evening} numberOfCols={4} onSelectTimeSlot={setTimeSlot}/>

  return (
    <Box
      width="100vw"
      height="100vh"
      bgcolor="#222222"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={4}
    >
      <Typography style={{ fontSize: 30, color: "white" }}>
        Build A slot Picker
      </Typography>

      <Button onClick={() => setIsModalOpen(!isModalOpen)} variant="contained">
        Open Modal
      </Button>
      <BasicDatePicker />

      <Drawer
        anchor="bottom"
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        PaperProps={{
          sx: { padding: 4 },
        }}
      >
        <Typography fontWeight={500}>Slot picker should be here.</Typography>
      </Drawer>

      <SlotSelect morningSlots={morningSlots} afterNoonSlots={afternoonSlots} eveningSlots={eveningSlots} />
      
    </Box>
  );
}

export default App;
