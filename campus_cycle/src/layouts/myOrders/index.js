import React, { useState, useEffect } from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Components
import ProductCard from 'layouts/market/components/card';
import AuctionProductCard from 'layouts/market/components/AuctionCard';

// Local address
import LOCAL_ADDR from 'GLOBAL_ADDRESS';

function MyOrders() {
  const userString = localStorage.getItem("user");
  const userId = parseInt(userString, 10);

  const [orderedProductIds, setOrderedProductIds] = useState([]);
  const [orderedAuctionProductIds, setOrderedAuctionProductIds] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [orderedAuctionProducts, setOrderedAuctionProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersResponse = await fetch(`${LOCAL_ADDR}orders`);
      if (!ordersResponse.ok) {
        throw new Error('Failed to fetch orders');
      }
      const ordersData = await ordersResponse.json();

      // Store product ids where userId and each order's buyer.id are the same
      const productIds = ordersData
        .filter(order => order.buyer.id === userId)
        .map(order => order.product.id);

      // Store auction product ids where userId and each order's buyer.id are the same
      const auctionProductIds = ordersData
        .filter(order => order.buyer.id === userId && order.productBidded)
        .map(order => order.productBidded.id);

      setOrderedProductIds(productIds);
      setOrderedAuctionProductIds(auctionProductIds);
      fetchProducts(productIds, auctionProductIds);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async (productIds, auctionProductIds) => {
    try {
      const productsResponse = await fetch(`${LOCAL_ADDR}products`);
      if (!productsResponse.ok) {
        throw new Error('Failed to fetch products');
      }
      const productsData = await productsResponse.json();

      // Filter products based on ordered product ids
      const orderedProducts = productsData.filter(product => productIds.includes(product.id));

      // Filter auction products based on ordered auction product ids
      const orderedAuctionProducts = productsData.filter(product => auctionProductIds.includes(product.id));

      setOrderedProducts(orderedProducts);
      setOrderedAuctionProducts(orderedAuctionProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox pt={6} pb={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={2} px={2}>
              <SoftBox mb={0.5}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Ordered Products
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={2}>
                {orderedProducts.map(item => (
                  <Grid item key={item.id}>
                    <ProductCard
                      id={item.id}
                      images={item.productImages?.map(image => image.url) || []}
                      price={item.price}
                      date={item.time}
                      details={item.title}
                    />
                  </Grid>
                ))}
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
        <SoftBox mb={3}>
          <Typography variant="h5" color="text" fontWeight="medium">Ordered Auction Products</Typography>
          <Card>
            <SoftBox pt={2} px={2}>
              <SoftBox mb={0.5}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Ordered Auction Products
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={2}>
                {orderedAuctionProducts.map(item => (
                  <Grid item key={item.id}>
                    <AuctionProductCard
                      id={item.id}
                      images={item.productImages?.map(image => image.url) || []}
                      price={item.price}
                      date={item.lastSellingDate}
                      details={item.title}
                    />
                  </Grid>
                ))}
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyOrders;
