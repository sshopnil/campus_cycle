import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SoftBox from 'components/SoftBox';
import ImageUpload from './image_upload'; // Import your image upload component
import 'react-toastify/dist/ReactToastify.css';

const ImageUploadDialog = ({ open, onClose, setUserImageUrl }) => {
  const [img, setImage] = useState(null);
  const userId = parseInt(localStorage.getItem("user"));

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="image-upload-dialog-title"
        aria-describedby="image-upload-dialog-description"
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
            <header style={{ margin: '0px 10px' }}>Upload Image</header>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <SoftBox component="form" role="form">
            <ImageUpload setImg={setImage} setUserImageUrl={setUserImageUrl} userId={userId} onClose={onClose} />
            <DialogActions>
              <Button
                variant="contained"
                sx={{ color: 'white !important' }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </SoftBox>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ImageUploadDialog;
