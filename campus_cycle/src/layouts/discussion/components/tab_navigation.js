import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Link, Typography } from "@mui/material";


export default function TabNavigation({ content1, content1_name, content1_topic, content2 }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Events" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Typography sx={{ fontWeight: "bold", fontSize: "34px" }}>{content1_name}</Typography>
          <header style={{ marginTop: '5px', color: 'black', fontSize: '14px', color: "#17C1E8" }}><Link>{"#" + content1_topic}</Link></header>
          <Grid container spacing={3}>

            {content1}
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid container spacing={3}>

            <Typography>Event</Typography>
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
}