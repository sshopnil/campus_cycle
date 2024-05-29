import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from 'axios';
import TimeAgo from '../TimeAgo';
import LOCAL_ADDR from 'GLOBAL_ADDRESS';
import './style.css';

function AuctionProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [zoomedImage, setZoomedImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${LOCAL_ADDR}products-bidded/${id}`);
                setProduct(response.data);
                setZoomedImage(response.data.images[0].url);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    function handleImageClick(image) {
        setZoomedImage(image.url);
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {product && (
                <Box my={4} display="flex" alignItems="center" gap={1} p={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className='imagesContainer'>
                        {product.images?.map((image, index) => (
                            <img key={index} src={image.url} alt="Product" onClick={() => handleImageClick(image)} />
                        ))}
                    </div>

                    <div className='selectedImage'>
                        <img src={zoomedImage} alt="Product" />
                    </div>

                    <div className='informationContainer'>
                        <div className='head'>
                            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: "center" }}>
                                <AccountCircleIcon fontSize='medium' sx={{ marginRight: '5px' }} />
                                {product.seller?.name || "Seller Name"}
                            </Typography>
                            <Typography variant="body2">
                                <TimeAgo date={product.time} />
                            </Typography>
                        </div>

                        <div className='details'>
                            <h4>{product.title}</h4>
                            <h6>{product.description}</h6>
                        </div>

                        <div className='bottom'>
                            <button>Bid</button>
                            <label>Price {product.price} tk</label>
                        </div>
                    </div>

                    <div className='biddersContainer'>
                        <h4>All Bidders</h4>
                        {/* Add bidders dynamically when API response includes bidder data */}
                        {/* {product.bidders.map((bidder, index) => (
                            <div key={index} className='bidder'>
                                <span>{index + 1}. {bidder.name}</span>
                                <span>{bidder.bidAmount} tk</span>
                            </div>
                        ))} */}
                    </div>
                </Box>
            )}
        </DashboardLayout>
    );
}

export default AuctionProductDetails;
