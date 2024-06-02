import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import TimeAgo from '../TimeAgo';
import LOCAL_ADDR from 'GLOBAL_ADDRESS';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuctionProductDetails() {
    const userString = localStorage.getItem("user");
    const userId = parseInt(userString);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [zoomedImage, setZoomedImage] = useState('');
    const [openBidDialog, setOpenBidDialog] = useState(false);
    const [biddingPrice, setBiddingPrice] = useState(0);
    const [productId, setProductId] = useState('');
    const [currentBid, setCurrentBid] = useState(0);
    const [bidders, setBidders] = useState([]);
    const [timer, setTimer] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${LOCAL_ADDR}products-bidded/${id}`);
                setProduct(response.data);
                setZoomedImage(response.data.images[0].url);
                setProductId(response.data.id);

                // Fetch current bid
                const currentBidResponse = await axios.get(`${LOCAL_ADDR}biddings/max/${response.data.id}`);
                if (currentBidResponse.data.length > 0) {
                    setCurrentBid(currentBidResponse.data[0].biddingPrice);
                } else {
                    setCurrentBid(response.data.price);
                }

                // Fetch all bidders
                const biddersResponse = await axios.get(`${LOCAL_ADDR}biddings/top/${response.data.id}`);
                setBidders(biddersResponse.data);

                // Initialize timer
                const endDate = new Date(response.data.lastSellingDate);
                setTimer(calculateTimeLeft(endDate));

            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (product) {
                const endDate = new Date(product.lastSellingDate);
                setTimer(calculateTimeLeft(endDate));
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [product]);

    const calculateTimeLeft = (endDate) => {
        const difference = endDate - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }
        return timeLeft;
    };

    const handleImageClick = (image) => {
        setZoomedImage(image.url);
    };

    const handleBidButtonClick = () => {
        if (timer.days === 0 && timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
            toast.warn('Bidding has finished');
        } else if (userId === product.seller.id) {
            toast.warn('Cannot bid on your own product');
        } else {
            setOpenBidDialog(true);
        }
    };

    const handleBidDialogClose = () => {
        setOpenBidDialog(false);
    };

    const handleBidSubmit = async () => {
        if (biddingPrice <= currentBid) {
            toast.error('Bidding price must be greater than current bid price');
            return;
        }

        try {
            const response = await axios.post(`${LOCAL_ADDR}biddings/make-bidding`, {
                biddingPrice: parseInt(biddingPrice),
                productBiddedId: parseInt(productId),
                userId: userId
            });
            console.log('Bid submitted:', response.data);
            toast.success('Bid submitted successfully');

            // Update current bid and bidders list
            const currentBidResponse = await axios.get(`${LOCAL_ADDR}biddings/max/${productId}`);
            setCurrentBid(currentBidResponse.data[0].biddingPrice);

            const biddersResponse = await axios.get(`${LOCAL_ADDR}biddings/top/${productId}`);
            setBidders(biddersResponse.data);

        } catch (error) {
            console.error('Error submitting bid:', error);
            toast.error('Error submitting bid');
        }
        setOpenBidDialog(false);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ToastContainer />
            {product && (
                <Box my={4} p={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={2}>
                            <div className='imagesContainer'>
                                {product.images?.map((image, index) => (
                                    <img key={index} src={image.url} alt="Product" onClick={() => handleImageClick(image)} />
                                ))}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='selectedImage'>
                                <img src={zoomedImage} alt="Product" />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4>Initial Bid: {product.price}</h4>
                                    <div style={{ display: 'flex' }}>
                                        {Object.entries(timer).map(([key, value]) => (
                                            <div key={key} style={{ textAlign: 'center', padding: '5px', backgroundColor: '#333', color: 'white', borderRadius: '5px', minWidth: '30px', marginRight: '5px' }}>
                                                <span style={{ display: 'block', fontSize: '10px' }}>{value}</span>
                                                <span style={{ display: 'block', fontSize: '5px' }}>{key}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='bottom'>
                                    <Button 
                                        variant="contained" 
                                        onClick={handleBidButtonClick}
                                    >
                                        Bid
                                    </Button>
                                    <div className='bidLabel'>
                                        <label>Current bid</label>
                                        <span>{currentBid}</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='biddersContainer'>
                                <h4>All Bidders</h4>
                                {bidders.length > 0 ? (
                                    bidders.map((bidder, index) => (
                                        <div key={index} className='bidder'>
                                            <span>{index + 1}. {bidder.user.name}</span>
                                            <span>{bidder.biddingPrice} tk</span>
                                        </div>
                                    ))
                                ) : (
                                    <Typography variant="h6" align="center" sx={{marginTop: "20%"}}>
                                        No bidders
                                    </Typography>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            )}
            <Dialog open={openBidDialog} onClose={handleBidDialogClose}>
                <DialogTitle>Place Your Bid</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Product ID: {productId}</Typography>
                    <Typography variant="body1">User ID: {userId}</Typography>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="biddingPrice"
                        label="Bidding Price"
                        type="number"
                        fullWidth
                        value={biddingPrice}
                        onChange={(e) => setBiddingPrice(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBidDialogClose}>Cancel</Button>
                    <Button onClick={handleBidSubmit}>Bid</Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}

export default AuctionProductDetails;
