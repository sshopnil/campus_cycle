import React, { useState, useEffect } from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import ProductCard from './components/card';
import AuctionProductCard from './components/AuctionCard';
import FilterBar from "layouts/market/components/FilterBar";

// Local address
import LOCAL_ADDR from 'GLOBAL_ADDRESS';

function Overview() {
  const [products, setProducts] = useState([]);
  const [auctionProducts, setAuctionProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({ name: 'All', value: 0 });

  useEffect(() => {
    fetchProducts();
  }, [selectedFilter]); // Fetch products when selectedFilter changes

  const fetchProducts = async () => {
    try {
      // Fetch normal products
      let url = `${LOCAL_ADDR}products`;
      if (selectedFilter.value !== 0) {
        url += `/product_type/${selectedFilter.value}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);

      // Fetch auction products
      let auctionUrl = `${LOCAL_ADDR}products-bidded`;
      if (selectedFilter.value !== 0) {
        auctionUrl += `/product_type/${selectedFilter.value}`;
      }
      const auctionResponse = await fetch(auctionUrl);
      if (!auctionResponse.ok) {
        throw new Error('Failed to fetch auction products');
      }
      const auctionData = await auctionResponse.json();
      setAuctionProducts(auctionData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to handle filter selection
  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar/>

      {/* Filter bar */}
      <SoftBox mt={5} bgColor="white" borderRadius="md" p={1}>
        {/* Pass handleFilterSelection function as prop to FilterBar */}
        <FilterBar onSelectFilter={handleFilterSelection} />
      </SoftBox>

      {/* Display selected filter */}
      <SoftBox mt={2}>
        <Typography style={{ fontSize: "30px", fontWeight: "bold", color: "#666C8F" }}>
          {selectedFilter.name === 'All' ? 'All Products' : `${selectedFilter.name} Products`}
        </Typography>
      </SoftBox>

      {/* Product cards */}
      <SoftBox mt={2} mb={3}>
        <Grid container spacing={2}>
          {products?.map((item) => (
            <Grid item key={item.id}>
              <ProductCard
                id={item.id}
                images={item.productImages?.map(image => image.url) || []}
                price={item.price}
                date={item.time}
                details={item.description}
              />
            </Grid>
          ))}
        </Grid>
      </SoftBox>

      {/* Auction products */}
      <SoftBox mt={2}>
        <Typography style={{ fontSize: "30px", fontWeight: "bold", color: "#666C8F" }}>
          Auction Products
        </Typography>
      </SoftBox>

      {/* Auction product cards */}
      <SoftBox mt={2} mb={3}>
        <Grid container spacing={2}>
          {auctionProducts?.map((item) => (
            <Grid item key={item.id}>
              <AuctionProductCard
                id={item.id}
                images={item.images?.map(image => image.url) || []}
                price={item.price}
                date={item.lastSellingDate}
                details={item.description}
              />
            </Grid>
          ))}
        </Grid>
      </SoftBox>
      
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
