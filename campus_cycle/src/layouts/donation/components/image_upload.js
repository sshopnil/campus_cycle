import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardMedia } from '@mui/material';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [tableLength, setTableLength] = useState(0);

  useEffect(() => {
    fetchTableLength();
  }, []);

  const fetchTableLength = () => {
    axios.get('http://localhost:5000/donations')
      .then(response => {
        setTableLength(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching table length:', error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    axios.post(`http://localhost:5000/donations/image_upload/${tableLength}`, formData)
      .then(response => {
        console.log('Image uploaded successfully:', response.data);
        // Handle success
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        // Handle error
      });
  };

  return (
    <div style={{ maxWidth: 345 }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" color="secondary" sx={{ color: 'white !important' }}>
          Upload Image
        </Button>
      </label>
      {image && (
        <Card>
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Preview Image"
          />
          <CardActions>
            <Button size="small" color="primary" onClick={() => setImage(null)}>
              Remove
            </Button>
            <Button size="small" color="secondary" onClick={handleUpload}>
              Confirm Upload
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
