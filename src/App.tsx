import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DateTimePopper } from "./components/DateTimePopper";
import { generateTimeSlots } from "./utils/time-formating-utils";

// Assume data arrives like this

// {
//   morning: ["10:00 am", "10:15 am", "10:30 am", "10:45 am", "11:00 am"],
//   afternoon: ["12:00 pm", "12:15 pm", "12:30 pm", "12:45 pm", "01:00 pm"],
//   evening: ["08:00 pm", "08:15 pm", "08:30 pm", "08:45 pm", "09:00 pm"],
// };

const availableTimeSlots = {
  morning: generateTimeSlots(8, 12, .25),
  afternoon: generateTimeSlots(12, 16, 0.25),
  evening: generateTimeSlots(16, 20, 0.25)
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlot, setTimeSlot] = useState<string | null>(null);
  const [selectedDate, setDate] = useState<string | null>(null);



  return (
    <Box
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
      
      <DateTimePopper timeSlots={availableTimeSlots} setDate={setDate} setTimeSlot={setTimeSlot} />

      <Box>
        <Typography style={{ fontSize: 30, color: "white" }}>
          Selected date and slot = {selectedDate}, {selectedTimeSlot}
        </Typography>
      </Box>
      
      
    </Box>
  );
}

export default App;
