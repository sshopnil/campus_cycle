import React, { useState, useEffect } from 'react';


// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";



// Overview page components
import ProductCard from './components/card';
import AuctionProductCard from './components/AuctionCard';
import FilterBar from "layouts/market/components/FilterBar";



// Data
import cardData from "layouts/market/data/cardData";
import auctionCardData from './data/actionCardData';

// local address
import LOCAL_ADDR from 'GLOBAL_ADDRESS';

function Overview() {
  const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${LOCAL_ADDR}products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
  
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
          {products?.map((item)=>{
            return (
            <Grid item key={item.id}>
              <ProductCard 
                id={item.id}
                images={item.productImages.map(image => image.url)}
                price={item.price}
                date={item.time}
                details={item.description}
              />
            </Grid>)
          })}
        </Grid>
      </SoftBox>


      {/* Auction products */}
      <SoftBox mt={2}>
        <Typography style={{fontSize: "30px", fontWeight: "bold", color: "#666C8F"}}>
          Auction Products
        </Typography>
      </SoftBox>

      {/*Auction product cards */}
      <SoftBox mt={2} mb={3}> 
        <Grid container spacing={2}>
          {auctionCardData?.map((item)=>{
            return (
            <Grid item key={item.id}>
              <AuctionProductCard images={item.images} price={item.price} date={item.date}/>
            </Grid>)
          })}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
