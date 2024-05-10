import React, { useState } from "react";
import { DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import LOCAL_ADDR from "../../../../GLOBAL_ADDRESS"

export default function FundForm() {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    organizer: "",
    goalAmount: "",
    imageUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async () => {
    try {
      // Add formData to the request body
      const response = await axios.post(`${LOCAL_ADDR}donations/create`, formData);
      console.log("Form submitted successfully:", response.data);
      // Reset the form fields after successful submission
      setFormData({
        title: "",
        details: "",
        organizer: "",
        goalAmount: "",
        imageUrl: "",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <DialogTitle>Raise a Fund</DialogTitle>
      <DialogContent>
        {/* Content for the dialog */}
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label={<Typography variant="subtitle2">Post Title</Typography>}
          type="text"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          sx={{ borderRadius: 10 }} // Rounded corners
        />
        <TextField
          margin="dense"
          id="details"
          label={<Typography variant="subtitle2">Post Details</Typography>}
          type="text"
          fullWidth
          value={formData.details}
          onChange={handleChange}
          variant="outlined"
          sx={{ borderRadius: 10 }} // Rounded corners
        />
        <TextField
          margin="dense"
          id="organizer"
          label={<Typography variant="subtitle2">Organizer Name</Typography>}
          type="text"
          fullWidth
          value={formData.organizer}
          onChange={handleChange}
          variant="outlined"
          sx={{ borderRadius: 10 }} // Rounded corners
        />
        <TextField
          margin="dense"
          id="goalAmount"
          label={<Typography variant="subtitle3">Targeted Amount</Typography>}
          type="number"
          fullWidth
          value={formData.goalAmount}
          onChange={handleChange}
          variant="outlined"
          sx={{ borderRadius: 10 }} // Rounded corners
        />
        <TextField
          margin="dense"
          id="imageUrl"
          label={<Typography variant="subtitle2">Image URL</Typography>}
          type="text"
          fullWidth
          value={formData.imageUrl}
          onChange={handleChange}
          variant="outlined"
          sx={{ borderRadius: 10 }} // Rounded corners
        />
        <input
          accept="image/*"
          id="raised-button-file"
          multiple
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained"
          color="primary"
          style={{
            width: "200px", // Adjust the width as needed
            borderRadius: 10, // Rounded corners
            background: "rgba(255, 255, 255, 0.1)", // Apply glass effect
            backdropFilter: "blur(10px)", // Apply glass effect
            border: "1px solid rgba(255, 255, 255, 0.2)", // Apply glass effect
            color: "black", // Set text color to black
            fontWeight: "bold", // Set text weight to bold
          }}>
            Choose a Photo
          </Button>
        </label>
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "200px", // Adjust the width as needed
            borderRadius: 10, // Rounded corners
            background: "rgba(255, 255, 255, 0.1)", // Apply glass effect
            backdropFilter: "blur(10px)", // Apply glass effect
            border: "1px solid rgba(255, 255, 255, 0.2)", // Apply glass effect
            color: "black", // Set text color to black
            fontWeight: "bold", // Set text weight to bold
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
}
