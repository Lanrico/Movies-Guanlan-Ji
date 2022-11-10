import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/system";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TabPanel from "../tabPanel";
import TrendingList from "../trendingBar"

function TrendingTabs({ type }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Paper elevation={3} style={{ maxWidth: '100%', overflow: 'auto' }} sx={{ marginBottom: '40px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography sx={{ margin: '20px 0 20px 40px' }} variant="h4" component="p" >{type === "movie" ? "What's popular" : type === "person" ? "Who's popular" : null}</Typography>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs" >
          <Tab label="In 24 hours" {...a11yProps(0)} sx={{ border: 1, borderColor: 'divider' }} />
          <Tab label="In 7 days" {...a11yProps(1)} sx={{ border: 1, borderColor: 'divider' }} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0} style={{ maxWidth: '100%', overflow: 'auto' }}>
        <Grid item xs={12}>
          <Stack direction="row" style={{ maxWidth: '100%', overflow: 'auto' }} spacing={3}>
            <TrendingList type={type} time_window={"day"} />
          </Stack>
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={1} style={{ maxWidth: '100%', overflow: 'auto' }}>
        <Grid item xs={12}>
          <Stack direction="row" style={{ maxWidth: '100%', overflow: 'auto' }} spacing={3}>
            <TrendingList  type={type} time_window="week" />
          </Stack>
        </Grid>
      </TabPanel>
    </Paper>
  );
}
export default TrendingTabs;