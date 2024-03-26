import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CardHeader from '@mui/material/CardHeader';
import jsonData from "../data/data.json";
import img from "../data/bruce-mars.jpg";

const DonationCardDetails = () => {
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    const selectedCard = jsonData.find(card => card.id === parseInt(cardId));
    setCardDetails(selectedCard);
  }, [cardId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2}>
        {cardDetails && (
          <>
            <Grid item md={8}>
              <Card sx={{ width: '100%' }}>
                <CardMedia
                  component="img"
                  alt="Card Image"
                  height="400"
                  image={img} 
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {cardDetails.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cardDetails.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card sx={{ minWidth: '300px' }}>
                <CardHeader
                  sx={{
                    alignSelf: 'center',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}
                  avatar={<RecordVoiceOverIcon fontSize="large" />}
                  title="Top Donors"
                />
                <hr
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    color: '#666C8F',
                    border: '1px solid'
                  }}
                />
                <CardContent style={{ height: '400px', overflowY: 'auto' }}>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </DashboardLayout>
  );
};

export default DonationCardDetails;
