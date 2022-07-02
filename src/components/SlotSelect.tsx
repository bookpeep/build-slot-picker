import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const enum Periods {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Evening = 'Evening'
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Container>
  );
}

export function SlotSelect(props: { morningSlots: React.ReactNode, afterNoonSlots: React.ReactNode, eveningSlots: React.ReactNode }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={Periods.Morning} />
          <Tab label={Periods.Afternoon} />
          <Tab label={Periods.Evening} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {props.morningSlots}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.afterNoonSlots}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {props.eveningSlots}
      </TabPanel>
    </Box>
  );
}
