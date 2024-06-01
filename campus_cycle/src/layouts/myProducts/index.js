import React, { useState, useEffect } from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import Footer from "examples/Footer";

// Components
import ProductForm from 'layouts/market/components/productForm';
import AuctionProductForm from 'layouts/market/components/auctionProductForm';
import ProductCard from 'layouts/market/components/card';
import AuctionProductCard from 'layouts/market/components/AuctionCard';

// Local address
import LOCAL_ADDR from 'GLOBAL_ADDRESS';

function MyProducts() {
  const userString = localStorage.getItem("user");
  const userId = parseInt(userString, 10);

  const [products, setProducts] = useState([]);
  const [auctionProducts, setAuctionProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [auctionDialogOpen, setAuctionDialogOpen] = useState(false);

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
      const filteredProducts = data.filter(item => item.seller.id === userId);
      setProducts(filteredProducts);

      const auctionResponse = await fetch(`${LOCAL_ADDR}products-bidded`);
      if (!auctionResponse.ok) {
        throw new Error('Failed to fetch auction products');
      }
      const auctionData = await auctionResponse.json();
      const filteredAuctionProducts = auctionData.filter(item => item.seller.id === userId);
      setAuctionProducts(filteredAuctionProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenAuctionDialog = () => {
    setAuctionDialogOpen(true);
  };

  const handleCloseAuctionDialog = () => {
    setAuctionDialogOpen(false);
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
                  Products
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={2}>
              <Grid item xs={12} md={6} xl={12} onClick={handleOpenDialog}>
                  <PlaceholderCard title={{ variant: 'h5', text: 'New Product' }} outlined />
                </Grid>
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
          </Card>
        </SoftBox>
        <SoftBox mb={3}>
          <Typography variant="h5" color="text" fontWeight="medium">Auction Products</Typography>
          <Card>
            <SoftBox pt={2} px={2}>
              <SoftBox mb={0.5}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Auction Products
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={2}>
              <Grid item xs={12} md={6} xl={12} onClick={handleOpenAuctionDialog}>
                  <PlaceholderCard title={{ variant: 'h5', text: 'New Auction Product' }} outlined />
                </Grid>
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
          </Card>
        </SoftBox>
      </SoftBox>
      {/* Dialog for new product */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>New Product</DialogTitle>
        <DialogContent>
          <ProductForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for new auction product */}
      <Dialog open={auctionDialogOpen} onClose={handleCloseAuctionDialog}>
        <DialogTitle>New Auction Product</DialogTitle>
        <DialogContent>
          <AuctionProductForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAuctionDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}

export default MyProducts;
