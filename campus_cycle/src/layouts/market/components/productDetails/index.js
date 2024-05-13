import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProductCard from "../card";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./style.css";

import LOCAL_ADDR from 'GLOBAL_ADDRESS';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [zoomedImage, setZoomedImage] = useState('');
    const [initial, setInitial] = useState(0);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${LOCAL_ADDR}products/${id}`);
                setProduct(response.data);
                setZoomedImage(response.data.productImages[0].url);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    function handleBackwardClick() {
        if (initial - itemsPerPage >= 0) {
            setInitial(initial - itemsPerPage);
        }
    }

    function handleForwardClick() {
        if (initial + itemsPerPage < product?.relatedProducts?.length) {
            setInitial(initial + itemsPerPage);
        }
    }

    function handleImageClick(image) {
        setZoomedImage(image.url);
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {product && (
                <Box my={4} display="flex" alignItems="center" gap={2} p={2} sx={{ display:'flex', flexWrap:'wrap' }}>
                    <div className='imagesContainer'>
                        {product.productImages.map((image, index) => (
                            <img key={index} src={image.url} alt="Product" onClick={() => handleImageClick(image)} />
                        ))}
                    </div>

                    <div className='selectedImage'>
                        <img src={zoomedImage} alt="Product" />
                    </div>

                    <div className='informationContainer'>
                        <div className='head'>
                            <Typography variant="h6" component="div" sx={{display:'flex', alignItems:"center"}}>
                                <AccountCircleIcon fontSize='medium' sx={{ marginRight:'5px'}} />
                                {product.seller.name}
                            </Typography>
                            <Typography variant="body2">
                                {product.time}
                            </Typography>
                        </div>

                        <div className='details'>
                            <h4>{product.title}</h4>
                            <h6>{product.description}</h6>
                        </div>

                        <div className='bottom'>
                            <button>Buy now</button>
                            <label>Price {product.price}tk</label>
                        </div>
                    </div>

                    <h1>Related Products</h1>
                    <div className='relatedProductsContainer'>
                        <Typography variant="h6" component="div" sx={{display:'flex', alignItems:"center"}}>
                            <ArrowBackIosNewIcon fontSize='medium' sx={{ marginRight:'5px'}} onClick={handleBackwardClick} />
                        </Typography>
                        
                        <SoftBox mt={2} mb={3}> 
                            <Grid container spacing={2}>
                                {product.relatedProducts && Array.isArray(product.relatedProducts) && product.relatedProducts.slice(initial, initial + itemsPerPage).map((item) => (
                                    <Grid item key={item.id}>
                                        <ProductCard id={item.id} images={item.productImages} price={item.price} date={item.time} details={item.description} />
                                    </Grid>
                                ))}
                            </Grid>
                        </SoftBox>

                        <Typography variant="h6" component="div" sx={{display:'flex', alignItems:"center"}}>
                            <ArrowForwardIosIcon fontSize='medium' sx={{ marginRight:'5px'}} onClick={handleForwardClick} />
                        </Typography>
                    </div>
                </Box>
            )}
        </DashboardLayout>
    );
}

export default ProductDetails;
