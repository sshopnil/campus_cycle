import React, { useState, useEffect } from 'react';
import { Grid, Button } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import jsonData from "./data/data.json";
import img from "./data/bruce-mars.jpg"
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "./data/dataBarChart";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader'; // Add this import
import Avatar from '@mui/material/Avatar'; // Add this import
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AddBoxIcon from '@mui/icons-material/AddBox'; // Add this import

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  
  value: PropTypes.number.isRequired,
};

function Donation() {
  const [cardsData, setCardsData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { chart } = reportsBarChartData;

  const groups = [
    { name: "Group 1", color: "#ff0000" },
    { name: "Group 2", color: "#00ff00" },
    { name: "Group 3", color: "#0000ff" }
  ];
  

  useEffect(() => {
    setCardsData(jsonData);
  }, []);

  const visibleCards = showAll ? cardsData : cardsData.slice(0, 3);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={1} >
        <Grid item xs={9}>
          <Grid container spacing={-2} >
            {visibleCards.map((card) => (
              <Grid key={card.id} item xs={12} md={4} style={{ marginBottom: "40px" }}>
                    {/* <LinearProgressWithLabel value={card.progress.current} /> */}
                <Card sx={{ maxWidth: 280 }}>
                  <CardMedia
                    component="img"
                    alt="Image"
                    height="180"
                    image={img}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  <LinearProgressWithLabel value={card.progress.current} />
                  </CardContent>
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
          <Card sx={{ minWidth: "300px"}}>
              <CardHeader
                  sx={{
                      alignSelf:"center",
                      textTransform: 'uppercase',
                      fontWeight:"bold"
                  }}
                  avatar={
                      <RecordVoiceOverIcon fontSize="200px"/>
                  }
                  title="Top Donors"
              />
              <hr style={{width: '80%', alignSelf: 'center', color:"#666C8F", border: '1px solid'}}/>
              <CardContent style={{ height: '800px', overflowY: 'auto' }}>
                {groups.map((item) => {
                    return <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: item.color, fontVariant:'small-caps'}} aria-label="Group logo">
                                {item.name.charAt(0)}
                            </Avatar>
                        }
                        key={item.name}
                        title={item.name}
                        action={
                            <Button variant="filled" startIcon={<AddBoxIcon />} color="primary" sx={{ alignContent: "center"}}>
                                Join
                            </Button>
                        }
                    />
                })}
              </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Donation;
