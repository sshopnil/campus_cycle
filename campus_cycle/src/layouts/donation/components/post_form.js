import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import ImageUpload from './image_upload'; // Import your image upload component
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LOCAL_ADDR from "../../../GLOBAL_ADDRESS"

const PostForm = ({ open, onClose }) => {
  const [showImg, setShowImg] = useState(false);
  const [img, setImage] = useState(null);
  const [imgId, setImgId] = React.useState();
  const userId = parseInt(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    goalAmount: '',
    creatorId: userId,
    organizerId: userId
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert the "goalAmount" value to a number if it's not empty
    const updatedValue = name === 'goalAmount' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${LOCAL_ADDR}donations/create`, formData); // Corrected API endpoint
      setImgId(response.data.id);
      console.log(response.data.id);
      setShowImg(true);
    } catch (error) {
      console.error('API error:', error.response);
      toast.error('Failed to create donation.');
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!img) {
      toast.error('Please upload an image.');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', img);
    
    try {
      const response = await axios.patch(`${LOCAL_ADDR}donations/image_upload/${imgId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Image uploaded successfully!');
      onClose();
      location.reload();
    } catch (error) {
      console.error('API error:', error.response);
      toast.error('Failed to upload image.');
    }
  };
  
  

  return (
    <React.Fragment>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: '400px' }}
      />
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '500px',
            },
          },
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <header style={{ margin: '0px 10px' }}>Start a Fund</header>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <SoftBox component="form" role="form" onSubmit={handleFormSubmit}>
            {!showImg ? (
              <>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Post title
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Description
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="text"
                    name="details"
                    placeholder="Post content here..."
                    multiline
                    rows={4}
                    value={formData.details}
                    onChange={handleInputChange}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Targeted amount($)
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    type="number"
                    name="goalAmount"
                    placeholder="i.e. 50, 100, 200 etc.."
                    value={formData.goalAmount}
                    onChange={handleInputChange}
                  />
                </SoftBox>
              </>
            ) : (
              <ImageUpload setImg={setImage} />
            )}
            <DialogActions>
              
              <Button
                variant="contained"
                sx={{ color: 'white !important' }}
                onClick={() => {
                  setShowImg(!showImg);
                  onClose();
                }}
              >
                Cancel
              </Button>
              {!showImg && (
                <Button
                  variant="contained"
                  sx={{ color: 'white !important' }}
                  onClick={(e) => {
                    setShowImg(!showImg);
                    handleFormSubmit(e);
                  }}
                >
                  Next
                </Button>
              )}
              {showImg && (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ color: 'white !important' }}
                  onClick={handleImageUpload}
                >
                  Post A Fund
                </Button>
              )}
            </DialogActions>
          </SoftBox>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default PostForm;
