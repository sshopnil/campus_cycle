import React, { useState, useRef } from 'react';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import axios from 'axios'; // Import Axios for making HTTP requests

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LOCAL_ADDR from 'GLOBAL_ADDRESS';



const ProductForm = () => {
  
  const userString = localStorage.getItem("user");
  const userId = parseInt(userString);
  const [productId, setProductId] = useState(0);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}.${currentDate.getMilliseconds().toString().padStart(3, '0')}`;

  const [formData, setFormData] = useState({
    sellerId: userId,
    title: '',
    description: '',
    price: 0,
    productTypeId: 0,
    lastSellingDate: formattedDate,
  });
  const [images, setImages] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isFirstFormSubmitted, setIsFirstFormSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'productTypeId' ? parseInt(value) : value,
    });
  };

  const handleFirstFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to create product endpoint
      const response = await axios.post(`${LOCAL_ADDR}products/create`, formData);
      // Extract productId from the response
      const Id = response.data.id;
      // Set productId in state
      setProductId(await response.data.id);
      // console.log(productId);
      setIsFirstFormSubmitted(true);
    } catch (error) {
      // Handle errors
      console.error('Error submitting product:', error);
      setAlertMessage('An error occurred while submitting the product.');
      setAlertOpen(true);
    }
  };

  const handleSecondFormSubmit = async (e) => {
    e.preventDefault();
    try {

      // Upload images one by one
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const formDataImage = new FormData();
        formDataImage.append('image', image);
        
        // Send image to upload endpoint
        await axios.patch(`${LOCAL_ADDR}product-images/image_upload/${productId}`, formDataImage);
      }
    
      // Reset form data and images state
      setFormData({
        sellerId: userId,
        title: '',
        description: '',
        price: 0,
        productTypeId: 0,
        lastSellingDate: '',
      });
      setImages([]);
      
      // Display success message using toast
      toast.success('Product submitted successfully with images!');
      setIsFirstFormSubmitted(false);
    } catch (error) {
      // Handle errors
      console.error('Error submitting product:', error);
      setAlertMessage('An error occurred while submitting the product.');
      setAlertOpen(true);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let selectedImages = [];
  
    if (files.length + images.length > 5) {
      setAlertMessage('You can only select up to 5 images.');
      setAlertOpen(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
  
    selectedImages = files;
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <SoftBox maxWidth="100%" mx="auto">
        <Typography variant="h1">Product Submission</Typography>
        {!isFirstFormSubmitted ? (
          <SoftBox component="form" role="form" onSubmit={handleFirstFormSubmit}>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Product Title:
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Product Title"
                required
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Product Description:
                </SoftTypography>
              </SoftBox>
              <SoftInput
                as="textarea"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Product Description"
                className='custom-textarea'
                required
              />
            </SoftBox>
            <SoftBox mb={2} display="flex" alignItems="center" >
              <SoftBox mr={2} width="50%">
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Product Type:
                  </SoftTypography>
                </SoftBox>
                <SoftBox>
                  <select
                    id="productTypeId"
                    name="productTypeId"
                    value={formData.productTypeId}
                    className='input-images'
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Product Type</option>
                    <option value="1">Chair</option>
                    <option value="2">Table</option>
                    <option value="3">Bed</option>
                    <option value="4">Others</option>
                  </select>
                </SoftBox>
              </SoftBox>
              <SoftBox width="50%">
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Price:
                  </SoftTypography>
                </SoftBox>
                <SoftInput
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  required
                />
              </SoftBox>
            </SoftBox>
            <SoftButton type="submit" variant="gradient" color="info" fullWidth>
              Next
            </SoftButton>
          </SoftBox>
        ) : (
          <SoftBox component="form" role="form" onSubmit={handleSecondFormSubmit}>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Product Images (up to 5):
                </SoftTypography>
              </SoftBox>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className='input-images'
                ref={fileInputRef}
                required
              />
              <SoftBox mt={1} className='image-container'>
                {images.map((image, index) => (
                  <div key={index} className='image-item'>
                    <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className='image' />
                    <button className='remove-image' onClick={() => setImages(prevImages => prevImages.filter((_, i) => i !== index))}>
                      <CancelRoundedIcon />
                    </button>
                  </div>
                ))}
              </SoftBox>
            </SoftBox>
            <SoftButton type="submit" variant="gradient" color="info" fullWidth>
              Submit
            </SoftButton>
          </SoftBox>
        )}
      </SoftBox>
      <Dialog open={alertOpen} onClose={handleCloseAlert}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{alertMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <SoftButton onClick={handleCloseAlert} color="info">
            OK
          </SoftButton>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default ProductForm;
