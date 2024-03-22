import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//image
import image from "layouts/market/data/Screenshot 2024-03-22 162045.png";

//components
import FavoriteCheckbox from "layouts/market/components/FavoriteCheckbox";

//icon pack
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function CustomCard({ children }) {
  return (
    <Card 
    style={{ 
        width: "320px",
        padding: "15px",
        boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.1)"
    }}>
      <Grid container spacing={1}>
        {children}
      </Grid>
    </Card>
  );
}

function Section1({ url }) {
    url = image;
  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item>
          <img src={url} alt="Product" style={{ width: '100px', height: '100px' }} />
        </Grid>
        <Grid item> {/*icon ckeclbox*/}
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}/> 
        </Grid>
      </Grid>
    </Grid>
  );
}

function Section2({ price, details, postingDate }) {
    // Truncate details after 30 characters
    const modifieddetails = details.length > 30 ? details.substring(0, 30) + '...' : details;
  return (
    <Grid item xs={6}>
      <Typography variant="h3" style={{color: "green" , fontSize: "15px"}}>Price: {price}</Typography>
      <Typography variant="h6" style={{fontSize:"12px", marginBottom: "10px", marginTop: "5px"}}>Details: {modifieddetails}</Typography>
      <Typography variant="body2" style={{fontSize: "12px"}}>{postingDate}</Typography>
      <Button size='small' variant="contained" style={{width: "70px",borderRadius: "20px",fontSize: "10px", color: "white", marginTop: "5px"}}>Details</Button>
    </Grid>
  );
}

function ProductCard() {
  return (
    <CustomCard>
      <Section1 url="your-image-url" />
      <Section2
        price="$100"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        postingDate="10 days ago"
      />
    </CustomCard>
  );
}

// Prop types validation for CustomCard
CustomCard.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is of type node and is required
};

// Prop types validation for Section1
Section1.propTypes = {
    url: PropTypes.string.isRequired, // Ensure url is of type string and is required
};

// Prop types validation for Section2
Section2.propTypes = {
    price: PropTypes.string.isRequired, // Ensure price is of type string and is required
    details: PropTypes.string.isRequired, // Ensure details is of type string and is required
    postingDate: PropTypes.string.isRequired, // Ensure postingDate is of type string and is required
  };

export default ProductCard;
