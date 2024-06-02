import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from 'react-router-dom';
import TimeAgo from '../TimeAgo';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import generatePDF from '../generatePDF';

import "./style.css";

import LOCAL_ADDR from 'GLOBAL_ADDRESS';

function ProductDetails() {
    const userString = localStorage.getItem("user");
    const userId = parseInt(userString, 10);

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [zoomedImage, setZoomedImage] = useState('');
    const [initial, setInitial] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [billingAddress, setBillingAddress] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [isSoldOut, setIsSoldOut] = useState(false);
    const [soldOutOrderDetails, setSoldOutOrderDetails] = useState(null); // New state for storing sold out order details
    const [buyerInfo, setBuyerInfo] = useState({}); // New state for storing buyer information
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

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${LOCAL_ADDR}orders`);
                const orders = response.data;
                const soldOutOrder = orders.find(order => order.product.id === parseInt(id));
                if (soldOutOrder) {
                    setIsSoldOut(true);
                    fetchOrderDetails(soldOutOrder.id); // Fetch order details if the product is sold out
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchOrderDetails = async (orderId) => {
            try {
                const response = await axios.get(`${LOCAL_ADDR}orders/${orderId}`);
                setSoldOutOrderDetails(response.data);

                // Fetch buyer info using buyerId from order details
                const buyerResponse = await axios.get(`${LOCAL_ADDR}users/${response.data.buyerId}`);
                setBuyerInfo(buyerResponse.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchProduct();
        fetchOrders();
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

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleConfirmDialogOpen = (orderData) => {
        setOrderData(orderData);
        setConfirmDialogOpen(true);
    };

    const handleConfirmDialogClose = () => {
        setConfirmDialogOpen(false);
        window.location.reload();  // Reload the page after closing the dialog
    };

    const generateTrackingNumber = () => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
        const formattedTime = `${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
        const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return `TRACK${formattedDate}${formattedTime}${randomNum}`;
    };

    const handleOrderSubmit = async () => {
        const orderData = {
            orderDate: new Date().toISOString(),
            shippingDate: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(),
            status: "Pending",
            trackingNumber: generateTrackingNumber(),
            buyerId: userId,
            sellerId: product.seller.id,
            billingAddress: billingAddress,
            shippingAddress: shippingAddress,
            productId: product.id,
            price: product.price // Add price to order data
        };

        try {
            const response = await axios.post(`${LOCAL_ADDR}orders`, orderData);
            handleConfirmDialogOpen(response.data);
            handleDialogClose();
            toast.success('Order successfully submitted!');
        } catch (error) {
            console.error('Failed to submit order:', error);
            toast.error('Failed to submit order. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleGeneratePDF = () => {
        if (orderData) {
            generatePDF(orderData);
        } else {
            toast.error('No order data available to generate PDF.');
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {product && (
                <Box my={4} display="flex" alignItems="center" gap={2} p={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className='imagesContainer'>
                        {product.productImages?.map((image, index) => (
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
                                {product.seller.name}
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
                            <Button
                                variant="contained"
                                onClick={handleDialogOpen}
                                disabled={product.seller.id === userId || isSoldOut}
                                style={{ cursor: (product.seller.id === userId || isSoldOut) ? 'not-allowed' : 'pointer' }}
                            >
                                {isSoldOut ? 'Sold Out' : 'Buy now'}
                            </Button>
                            <label>Price {product.price}tk</label>
                        </div>
                    </div>
                </Box>
            )}

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Make an Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the following information to complete your order.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="billingAddress"
                        label="Billing Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="shippingAddress"
                        label="Shipping Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleOrderSubmit} color="primary">
                        Confirm Order
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here are the details of your order:
                    </DialogContentText>
                    {orderData && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Order Date</TableCell>
                                        <TableCell>{formatDate(orderData.orderDate)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Shipping Date</TableCell>
                                        <TableCell>{formatDate(orderData.shippingDate)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>{orderData.status}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Tracking Number</TableCell>
                                        <TableCell>{orderData.trackingNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Billing Address</TableCell>
                                        <TableCell>{orderData.billingAddress}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Shipping Address</TableCell>
                                        <TableCell>{orderData.shippingAddress}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>{product.title}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Price</TableCell>
                                        <TableCell>{product.price} tk</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleGeneratePDF} color="primary">
                        Download Invoice
                    </Button>
                    <Button onClick={handleConfirmDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {soldOutOrderDetails && (userId === product.seller.id || userId === soldOutOrderDetails.buyer.id )&& ( // Render sold out order details only if userId matches sellerId
                <Box mt={4} p={2}>
                    <Typography variant="h5">Sold Out Order Details</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Order Date</TableCell>
                                    <TableCell>{formatDate(soldOutOrderDetails.orderDate)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Shipping Date</TableCell>
                                    <TableCell>{formatDate(soldOutOrderDetails.shippingDate)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Seller name</TableCell>
                                    <TableCell>{soldOutOrderDetails.seller.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Seller phoneNo</TableCell>
                                    <TableCell>{soldOutOrderDetails.seller.phoneNo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Buyer Name</TableCell>
                                    <TableCell>{soldOutOrderDetails.buyer.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Buyer Phone Number</TableCell>
                                    <TableCell>{soldOutOrderDetails.buyer.phoneNo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Buyer Email</TableCell>
                                    <TableCell>{soldOutOrderDetails.buyer.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Status</TableCell>
                                    <TableCell>{soldOutOrderDetails.status}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tracking Number</TableCell>
                                    <TableCell>{soldOutOrderDetails.trackingNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Billing Address</TableCell>
                                    <TableCell>{soldOutOrderDetails.billingAddress}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Shipping Address</TableCell>
                                    <TableCell>{soldOutOrderDetails.shippingAddress}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>{soldOutOrderDetails.product.title}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Price</TableCell>
                                    <TableCell>{soldOutOrderDetails.price} tk</TableCell>
                                </TableRow>
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            <ToastContainer />
        </DashboardLayout>
    );
}

export default ProductDetails;
