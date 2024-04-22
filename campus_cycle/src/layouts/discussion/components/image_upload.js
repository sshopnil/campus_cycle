import React, { useState } from 'react';
import { Button, Card, CardActions, CardMedia } from '@mui/material';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  // Function to handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div style={{ maxWidth: 345}}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" color='secondary' sx={{color:"white !important"}}>
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
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
