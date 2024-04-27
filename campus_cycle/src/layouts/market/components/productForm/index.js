import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import './ProductForm.css';

const ProductForm = () => {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [alertOpen, setAlertOpen] = useState(false); // State for controlling alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // State for setting alert message
  const fileInputRef = useRef(null); // Create a ref for file input

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      username,
      title,
      description,
      date,
      images,
      price,
    });
    setUsername('');
    setTitle('');
    setDescription('');
    setDate('');
    setImages([]);
    setPrice('');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let selectedImages = [];

    if (files.length + images.length > 5) {
      setAlertMessage("You can only select up to 5 images.");
      setAlertOpen(true);
      // Clear file input value
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    selectedImages = files;
    setImages(prevImages => [...prevImages, ...selectedImages]);
  };

  // Close alert handler
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
     
      <SoftBox maxWidth="60%" mx="auto">
      <Typography variant='h1'>Product Submision</Typography>
        <SoftBox component="form" role="form" onSubmit={handleSubmit}>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Username:
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Product Title:
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              className='custom-textarea'
              required
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Date:
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Product Images (up to 5):
              </SoftTypography>
            </SoftBox>
            <input
              type="file"
              id="images"
              multiple  // Allow multiple file selection
              accept="image/*"
              onChange={handleImageChange}
              className='input-images'
              ref={fileInputRef} // Set ref to file input
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
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Price:
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
          </SoftBox>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
            Submit
          </SoftButton>
        </SoftBox>
      </SoftBox>
      <Dialog open={alertOpen} onClose={handleCloseAlert}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SoftButton onClick={handleCloseAlert} color="info">
            OK
          </SoftButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default ProductForm;
