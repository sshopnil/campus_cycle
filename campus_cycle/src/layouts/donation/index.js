import React, { useState, useEffect } from 'react';
import { Grid, Button } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Progress } from 'rsuite';
import Typography from '@mui/material/Typography';
import jsonData from "./data/data.json";
import jsonDataBarChart from "./data/dataBarChart.json";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import from Recharts

function Donation() {
  const [cardsData, setCardsData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setCardsData(jsonData);
  }, []);

  const visibleCards = showAll ? cardsData : cardsData.slice(0, 3);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <Grid container spacing={2}>
        <Grid item xs={9}> {/* Main section for donation cards */}
          <Grid container spacing={2}>
            {visibleCards.map((card) => (
              <Grid key={card.id} item xs={12} md={4}>
                <Card sx={{ maxWidth: 200 }}>
                  <CardMedia
                    component="img"
                    alt="Image"
                    height="140"
                    image={card.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Progress.Line percent={(card.progress.current / card.progress.goal) * 100} />
                    <Typography variant="body2" color="text.secondary">
                      {`Progress: ${card.progress.current} / ${card.progress.goal}`}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {!showAll ? (
            <Grid container justifyContent="center" mt={2}>
              <Button onClick={() => setShowAll(true)} variant="secondary">See All</Button>
            </Grid>
          ) : (
            <Grid container justifyContent="center" mt={2}>
              <Button onClick={() => setShowAll(false)} variant="secondary">See Less</Button>
            </Grid>
          )}
        </Grid>

        <Grid item xs={3}> {/* Sidebar for profile data */}
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <Typography variant="h6">Profile Data</Typography>
            {/* Add your profile data components here */}
          </div>
        </Grid>

        <Grid item xs={9}> {/* Main section for bar chart */}
            <BarChart
                width={680}
                height={300}
                data={jsonDataBarChart} 
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill="#82ca9d" />
            </BarChart>
        </Grid>


        
      </Grid>
    </DashboardLayout>
  );
}

export default Donation;
