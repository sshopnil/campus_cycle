// material ui
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from "@mui/material/Grid";
// 
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProductCard from "../card";

import cardData from "layouts/market/data/cardData";

//react
import { useParams } from 'react-router-dom';
import { useState } from 'react';


// css
import "./style.css";
import { func } from 'prop-types';
function productDetails(){

    const { id } = useParams();
    const product = cardData.find((product) => product.id == id); 
    const [zoomedImage, setzoomedImage] = useState(product.images[0]);
    const [initial, setinitial]= useState(0);
    const itemsPerPage = 3;
    function handleBackwordClick (){
        if (initial - itemsPerPage >= 0) {
            setInitial(initial - itemsPerPage);
        }
    }
    function handleforwardClick (){
        if (initial + itemsPerPage < cardData.length) {
            setInitial(initial + itemsPerPage);
        }
    }
    function handleImageClick (image){
        setzoomedImage(image);
    };
    const date = ()=>{
         
    }
    return(
        <DashboardLayout>
            <DashboardNavbar />
            <Box
                my={4}
                display="flex"
                alignItems="center"
                gap={2}
                p={2}
                sx={{ display:'flex', flexWrap:'wrap' }}
            >
                <div className='imagesContainer'>
                    {product.images.map((image, index) => (
                        <img key={index} src={image} alt="Product" onClick={()=>handleImageClick(image)}/>
                    ))}
                </div>

                <div className='selectedImage'>
                    {/* <Button variant="contained"  startIcon={<ArrowBackIosNewIcon />} > </Button> */}
                    <img  src={zoomedImage} alt="Product" />
                    {/* <Button variant="contained"  endIcon={<ArrowForwardIosIcon />}> </Button>     */}
                </div>
                {/* product information */}
                <div className='informationContainer'>
                    <div className='head'>
                        <Typography variant="h6" component="div" sx={{display:'flex', alignItems:"center"}}><AccountCircleIcon fontSize='medium' sx={{ marginRight:'5px'}}/>
                            {product.username}
                        </Typography>
                        <Typography variant="body2">
                            {product.date} 
                        </Typography>
                    </div>
                    {/* end head */}
                    <div className='details'>
                       <h4>{product.title}</h4>
                       <h6>{product.details}</h6> 
                    </div>
                    <div className='bottom'>
                        <button>Buy now</button>
                        <label>Price {product.price}tk</label>
                    </div>
                </div>
                <h1>Related Products</h1>
                <div className='ralatedProductsContainer'>
                    <Typography variant="h6" component="div" sx={{display:'flex', alignItems:"center"}}><ArrowBackIosNewIcon fontSize='medium' sx={{ marginRight:'5px'}} onClick={()=>handleBackwordClick}/>     
                    </Typography>
                    {/* related products */}
                    <SoftBox mt={2} mb={3}> 
                        <Grid container spacing={2}>
                            {cardData?.slice(initial, initial+itemsPerPage).map((item) => {
                            return (
                                <Grid item key={item.id}>
                                <ProductCard id={item.id} images={item.images} price={item.price} date={item.date} details={item.details}/>
                                </Grid>
                            );
                            })}
                        </Grid>
                    </SoftBox>

                    <Typography variant="h6" component="div" sx={{display:'flex', alignItems:"center"}}><ArrowForwardIosIcon fontSize='medium' sx={{ marginRight:'5px'}} onClick={()=>handleforwardClick}/>     
                    </Typography>

                </div>
            </Box>
            
            {/* <h1>product Details</h1>
            <div>
                {product.images.map((image, index) => (
                <img key={index} src={image} alt="Product" style={{ width: '100px', height: '100px' }} />
                ))}
            </div>
            <h2>{product.title}</h2>
            <p>username : {product.username}</p>
            <p>{product.details}</p>
            <p>Price: {product.price}</p>
            <p>Posting Date: {product.date}</p> */}
        </DashboardLayout>
        
    )
}

export default productDetails;