import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TimeAgo from '../TimeAgo';

//image
import image from "layouts/market/data/Screenshot 2024-03-22 162045.png";

//components
import FavoriteCheckbox from "layouts/market/components/FavoriteCheckbox";

//icon pack
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


// function getTimeAgo(dateString) {
//   const date = new Date(dateString);
//   const now = new Date();
//   const timeDiff = Math.abs(now - date);
  
//   const minutesDiff = Math.floor(timeDiff / (1000 * 60));
//   const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
//   const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
//   if (minutesDiff < 60) {
//       return `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''} ago`;
//   } else if (hoursDiff < 24) {
//       return `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''} ago`;
//   } else {
//       return `${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago`;
//   }
// }


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
  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item>
          <img src={url} alt="Product" style={{borderRadius: "10px", width: '100px', height: '100px' }} />
        </Grid>
        <Grid item> {/*icon ckeclbox*/}
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}/> 
        </Grid>
      </Grid>
    </Grid>
  );
}

function Section2({id,  price, details, postingDate }) {
    // Truncate details after 30 characters
    const modifieddetails = details.length > 30 ? details.substring(0, 30) + '...' : details;
  return (
    <Grid item xs={6}>
      <Typography variant="h3" style={{color: "green" , fontSize: "15px"}}>Price: {price}</Typography>
      <Typography variant="h6" style={{fontSize:"12px", marginBottom: "10px", marginTop: "5px"}}>Details: {modifieddetails}</Typography>
      <Typography variant="body2" style={{fontSize: "12px"}}><TimeAgo date={postingDate}/></Typography>
      <Link to={"/market/product-details/"+id}>
        <Button size='small' variant="contained" style={{width: "70px",borderRadius: "20px",fontSize: "10px", color: "white", marginTop: "5px"}}>Details</Button>
      </Link>
    </Grid>
  );
}

function ProductCard({id, images, price, date, details}) {

  return (
    <CustomCard>
      <Section1 url={images[0]} />
      <Section2
        id = {id}
        price={price}
        details={details}
        postingDate={date}
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
    id: PropTypes.string.isRequired, // Ensure id is of type string and is required
    price: PropTypes.string.isRequired, // Ensure price is of type string and is required
    details: PropTypes.string.isRequired, // Ensure details is of type string and is required
    postingDate: PropTypes.string.isRequired, // Ensure postingDate is of type string and is required
  };
export default ProductCard;