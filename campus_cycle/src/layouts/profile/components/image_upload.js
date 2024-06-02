import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SoftBox from 'components/SoftBox';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GLOBAL_ADD from "../../../GLOBAL_ADDRESS";

const ImageUpload = ({ setImg, setUserImageUrl, userId, onClose }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImg(file);
      setPreview(URL.createObjectURL(file));

      // Upload image as soon as it's selected
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.patch(`${GLOBAL_ADD}users/image_upload/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Image uploaded successfully!');
        setUserImageUrl(response.data.imageUrl); // Update the user's image URL
        onClose();
      } catch (error) {
        console.error('API error:', error.response);
        toast.error('Failed to upload image.');
      }
    }
  };

  const handleButtonClick = () => {
    document.getElementById('image-upload-input').click();
  };

  return (
    <SoftBox textAlign="center">
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
      <input
        type="file"
        accept="image/*"
        id="image-upload-input"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <Button variant="contained" sx={{ color: 'white !important', mb: 2 }} onClick={handleButtonClick}>
        Choose Photo
      </Button>
      {preview && (
        <SoftBox mt={2}>
          <img src={preview} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </SoftBox>
      )}
    </SoftBox>
  );
};

export default ImageUpload;
