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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredAuctionProducts, setFilteredAuctionProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({ name: 'All', value: 0 });
  const [filterCriteria, setFilterCriteria] = useState({ searchText: '', minPrice: '', maxPrice: '' });

  useEffect(() => {
    fetchProducts();
  }, [selectedFilter]); // Fetch products when selectedFilter changes

  useEffect(() => {
    applyFilters();
  }, [products, auctionProducts, filterCriteria]); // Apply filters when products, auction products, or filter criteria change

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

  const applyFilters = () => {
    const { searchText, minPrice, maxPrice } = filterCriteria;

    const filterProductList = (list) => {
      return list.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase()); // Compare search text with title
        const matchesMinPrice = !minPrice || item.price >= minPrice;
        const matchesMaxPrice = !maxPrice || item.price <= maxPrice;
        return matchesSearch && matchesMinPrice && matchesMaxPrice;
      });
    };

    setFilteredProducts(filterProductList(products));
    setFilteredAuctionProducts(filterProductList(auctionProducts));
  };

  // Function to handle filter selection
  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
  };

  // Function to handle filter criteria change
  const handleFilterCriteriaChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar/>

      {/* Filter bar */}
      <SoftBox mt={5} bgColor="white" borderRadius="md" p={1}>
        {/* Pass handleFilterSelection function as prop to FilterBar */}
        <FilterBar 
          onSelectFilter={handleFilterSelection} 
          onFilterCriteriaChange={handleFilterCriteriaChange} 
        />
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
          {filteredProducts?.map((item) => (
            <Grid item key={item.id}>
              <ProductCard
                id={item.id}
                title={item.title}
                images={item.productImages?.map(image => image.url) || []}
                price={item.price}
                date={item.time}
                details={item.title}
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
          {filteredAuctionProducts?.map((item) => (
            <Grid item key={item.id}>
              <AuctionProductCard
                id={item.id}
                title={item.title}
                images={item.images?.map(image => image.url) || []}
                price={item.price}
                date={item.lastSellingDate}
                details={item.title}
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
