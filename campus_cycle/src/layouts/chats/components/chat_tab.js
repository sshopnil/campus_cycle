import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Link, Typography } from "@mui/material";
import { useSoftUIController} from "context";



export default function ChatTab({ content1, content2 }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [controller, dispatch] = useSoftUIController();
  
  const { active_topic } = controller;
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Global Chat" value="1" />
            <Tab label="Career Counseling" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={3}>
            {content1}
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid container spacing={3} justifyContent={'center'}>
          <Typography my={5} alignSelf={'center'}>Welcome, to our chatbot for counseling! {"<<Powered By Gemini AI>>"}</Typography>
            {content2}
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
}