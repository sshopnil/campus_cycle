/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState } from 'react';


// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';



// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";



// Overview page components
import ProductCard from './components/card';
import FilterBar from "layouts/market/components/FilterBar";



// Data
import cardData from "layouts/market/data/cardData";

// Images


function Overview() {
  
    // State to track the selected filter
    const [selectedFilter, setSelectedFilter] = useState('All');

    // Function to handle filter selection
    const handleFilterSelection = (filter) => {
      setSelectedFilter(filter);
    };
  return (
    <DashboardLayout>
      <DashboardNavbar/>

      {/* filter bar */}
      <SoftBox mt={5}bgColor="white"  borderRadius="md"  p={1} >
        {/* Pass handleFilterSelection function as prop to FilterBar */}
        <FilterBar onSelectFilter={handleFilterSelection} />
      </SoftBox>



      {/* All products */}
      <SoftBox mt={2}>
        <Typography style={{fontSize: "30px", fontWeight: "bold", color: "#666C8F"}}>
          {/* Display selected filter */}
          {selectedFilter === 'All' ? 'All Products' : `${selectedFilter} Products`}
        </Typography>
      </SoftBox>



      {/* product cards */}
      <SoftBox mt={2} mb={3}> 
        <Grid container spacing={2}>
          {cardData?.map((item)=>{
            return (<Grid item key={item.id}>
              <ProductCard images={item.images} price={item.price} date={item.date}/>
            </Grid>)
          })}
          
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
