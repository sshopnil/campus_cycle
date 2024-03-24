// ReportsBarChartComponent.js
import React from 'react';
import { Grid } from "@mui/material";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

function ReportsBarChartComponent({ chart }) {
  return (
    <Grid item xs={9}>
      <div style={{ width: '900px', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '800px', margin: '0 auto' }}>
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
  );
}

export default ReportsBarChartComponent;
