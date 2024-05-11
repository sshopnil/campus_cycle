import React, { useState, useRef } from 'react';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import './AuctionProductForm.css';

const AuctionProductForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    description: '',
    lastSellingDate: '',
    images: [],
    price: '',
    productTypeId: '',
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ formData });
    setFormData({
      username: '',
      title: '',
      description: '',
      lastSellingDate: '',
      images: [],
      price: '',
      productTypeId: '',
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let selectedImages = [];

    if (files.length + formData.images.length > 5) {
      setAlertMessage("You can only select up to 5 images.");
      setAlertOpen(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    selectedImages = files;
    setFormData(prevData => ({
      ...prevData,
      images: [...prevData.images, ...selectedImages]
    }));
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <SoftBox maxWidth="100%" mx="auto">
        <Typography variant='h1'>Auction Product Submission</Typography>
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
              name="username"
              value={formData.username}
              onChange={handleInputChange}
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
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Last Selling Date:
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="date"
              id="lastSellingDate"
              name="lastSellingDate"
              value={formData.lastSellingDate}
              onChange={handleInputChange}
              required
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Product Type:
              </SoftTypography>
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
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className='input-images'
              ref={fileInputRef}
              required
            />
            <SoftBox mt={1} className='image-container'>
              {formData.images.map((image, index) => (
                <div key={index} className='image-item'>
                  <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className='image' />
                  <button className='remove-image' onClick={() => setFormData(prevData => ({
                    ...prevData,
                    images: prevData.images.filter((_, i) => i !== index)
                  }))}>
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
    </>
  );
};

export default AuctionProductForm;
