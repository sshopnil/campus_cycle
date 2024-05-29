import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function CustomCard({ children }) {
  return (
    <Card
      style={{
        backgroundColor: "#E4D37B",
        width: "320px",
        padding: "15px",
        boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.1)"
      }}
    >
      <Grid container spacing={1}>
        {children}
      </Grid>
    </Card>
  );
}

function Section1({ url }) {
  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item>
          <img src={url} alt="Product" style={{ borderRadius: "10px", width: '300px', height: '170px' }} />
        </Grid>
      </Grid>
    </Grid>
  );
}

function Section2({ price, details, timer }) {
  const modifieddetails = details.length > 30 ? details.substring(0, 30) + '...' : details;

  return (
    <Grid item xs={12}>
      <Typography variant="h3" style={{ color: "green", fontSize: "15px" }}>Price: {price}</Typography>
      <Typography variant="h6" style={{ fontSize: "12px", marginBottom: "10px", marginTop: "5px" }}>Details: {modifieddetails}</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <Button size='small' variant="contained" style={{ borderRadius: "20px", fontSize: "10px", color: "white" }}>Details</Button>
        <div style={{ display: 'flex' }}>
          {Object.entries(timer).map(([key, value]) => (
            <div key={key} style={{ textAlign: 'center', padding: '5px', backgroundColor: '#333', color: 'white', borderRadius: '5px', minWidth: '30px', marginRight: '5px' }}>
              <span style={{ display: 'block', fontSize: '10px' }}>{value}</span>
              <span style={{ display: 'block', fontSize: '5px' }}>{key}</span>
            </div>
          ))}
        </div>
        
      </div>
    </Grid>
  );
}

function AuctionProductCard({ id, images, price, date, details }) {
  const calculateTimeLeft = () => {
    const difference = new Date(date) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [timer, setTimer] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [date]);

  return (
    <CustomCard>
      <Section1 url={images[0]} />
      <Section2
        price={price}
        details={details}
        timer={timer}
      />
    </CustomCard>
  );
}

// Prop types validation for CustomCard
CustomCard.propTypes = {
  children: PropTypes.node.isRequired,
};

// Prop types validation for Section1
Section1.propTypes = {
  url: PropTypes.string.isRequired,
};

// Prop types validation for Section2
Section2.propTypes = {
  price: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  timer: PropTypes.object.isRequired,
};

AuctionProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
};

export default AuctionProductCard;
