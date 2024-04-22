import React, { useState } from 'react';
import { Grid, Button } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "./data/dataBarChart";

import DonationCard from "./components/DonationCard";
import SideBar from "./components/SideBar"


import './styles.css';



function Donation() {
  const [showMore, setShowMore] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const { chart } = reportsBarChartData;

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={1} >
        <Grid item xs={9}>
          <Grid container spacing={-2} >
            <DonationCard />
            
          </Grid>

          {/* bar chart */}
          <Grid item xs={9}>
            <div style={{ width: '900px' , marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
              <div style={{ width: '800px' ,margin: '0 auto' }}>
                <ReportsBarChart
                  title="active users"
                  description={
                    <>
                      (<strong>+23%</strong>) than last week
                    </>
                  }
                  chart={chart}
                />
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={3}>
         {/* sidebar content */}
          <SideBar />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Donation;
