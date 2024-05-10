import React, { useState } from 'react';
import { Button, Card, CardActions, CardMedia } from '@mui/material';
import { dataUriToBuffer } from 'data-uri-to-buffer';

const ImageUpload = ({setImg}) => {
  const [image, setImage] = useState(null);

  // Function to handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // const base64Image = reader.result.replace(/^data:image\/(png|jpeg|gif);base64,/, '');
        // console.log(Buffer.from(base64Image, 'base64'));
        const fileMetadata = {
          fieldname: 'image',
          originalname: file.name,
          encoding: file.encoding || '7bit', // Default encoding value for binary data
          mimetype: file.type,
          size: file.size,
          buffer: dataUriToBuffer(reader.result).buffer
        };
        setImage(reader.result);
        setImg(file);
        console.log(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImg(null);
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
