import React, { useState, useEffect } from 'react';
import { Grid, Button } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import jsonData from "./data/data.json";
import img from "./data/bruce-mars.jpg"
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "./data/dataBarChart";
import CardHeader from '@mui/material/CardHeader'; // Add this import
import Avatar from '@mui/material/Avatar'; // Add this import
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import ProgressBar from "@ramonak/react-progress-bar";



function Donation() {
  const [cardsData, setCardsData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showMore, setShowMore] = useState(3);
  var remainingCardData = 10;
  const { chart } = reportsBarChartData;

  const groups = [
    { name: "Group 1", color: "#ff0000" },
    { name: "Group 2", color: "#00ff00" },
    { name: "Group 3", color: "#0000ff" }
  ];
  

  useEffect(() => {
    setCardsData(jsonData);
  }, []);

  const visibleCards = showAll ? cardsData : cardsData.slice(0, showMore);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={1} >
        <Grid item xs={9}>
          <Grid container spacing={-2} >
            {visibleCards.map((card) => (
              <Grid key={card.id} item xs={12} md={4} style={{ marginBottom: "40px" }}>
              <Card sx={{ 
                maxWidth: 280,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)', 
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              }}>
                <CardMedia
                  component="img"
                  alt="Image"
                  height="180"
                  image={img}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{marginBottom: '20px'}}>
                    {card.title}
                  </Typography>
                  <Typography style={{marginBottom: '10px'}}>
                    ${card.progress.goal} of ${card.progress.current} is raised
                  </Typography>
                  <ProgressBar completed={card.progress.current} />
                </CardContent>
              </Card>
              
              </Grid>
            ))}
          </Grid>
          {!showAll ? (
            <Grid container justifyContent="center" mt={2}>
            <Button 
            onClick={() => {
              console.log(remainingCardData+" before if else")
              if (remainingCardData < 6) {
                console.log(remainingCardData+" after if else")
                setShowMore(remainingCardData);
                setShowAll(true);

              }else{
                setShowMore(
                  (remainingCardData) < 6 ? remainingCardData : showMore + 6
                );
                remainingCardData = remainingCardData-showMore
                
                console.log(remainingCardData)
              }
            }} 
            variant="secondary"
          >
            See All
          </Button>
          
            </Grid>
          ) : (
            <Grid container justifyContent="center" mt={2}>
              <Button onClick={() =>{
                setShowAll(false)
                setShowMore(3) }
              } variant="secondary">See Less</Button>
              
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
              <CardContent style={{ height: '400px', overflowY: 'auto' }}>
                {groups.map((item) => {
                    return <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: item.color, fontVariant:'small-caps'}} aria-label="Group logo">
                                {item.name.charAt(0)}
                            </Avatar>
                        }
                        key={item.name}
                        title={item.name}
                    />
                })}
              </CardContent>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', padding: '10px' }}>
                <div style={{ margin: '10px', borderRadius: '10px', backgroundColor: 'rgba(240, 240, 240, 0.5)', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <div><PaidIcon />Total donation</div>
                  
                  {/* Add content for Total donation */}
                </div>
                <div style={{ margin: '10px', borderRadius: '10px', backgroundColor: 'rgba(240, 240, 240, 0.5)', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <div><CalendarTodayIcon />Donation today</div>
                  
                  {/* Add content for Donation today */}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <div style={{ margin: '10px', borderRadius: '10px', backgroundColor: 'rgba(240, 240, 240, 0.5)', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <div><GroupIcon />Total donner</div>
                  
                  {/* Add content for Total donner */}
                </div>
                <div style={{ margin: '10px', borderRadius: '10px', backgroundColor: 'rgba(240, 240, 240, 0.5)', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <div><DataSaverOffIcon />Avg donation</div>
                  
                  {/* Add content for Avg donation */}
                </div>
              </div>

          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Donation;
