import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import ImageUpload from "./image_upload";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios"; // Import axios for making HTTP requests

const MyForm = ({ formData, setFormData }) => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      // Convert the "goalAmount" value to a number if it's not empty
      const updatedValue = name === "goalAmount" ? parseFloat(value) : value;
      setFormData({ ...formData, [name]: updatedValue });
    };
  
    return (
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
            placeholder="title"
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
    );
  };
  

const PostForm = ({ open, onClose }) => {
  const [en, setEn] = useState(true);
  const [showImg, setShowImg] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    goalAmount: "",
    details: "",
    creatorId: 1, // Assuming this is the creator's ID
    organizerId: 1, // Assuming this is the organizer's ID
  });

  const handleSubmit = () => {
    axios.post("http://localhost:5000/donations/create", formData)
      .then(response => {
        console.log("Donation created:", response.data);
        onClose(false); // Close the dialog after successful submission
      })
      .catch(error => {
        console.error("Error creating donation:", error);
        // Handle error
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px",
          },
        },
      }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="end" color="inherit" onClick={() => onClose(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
          <header style={{ margin: "0px 10px" }}>Create a post</header>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <SoftBox component="form" role="form">
          {showImg ? <ImageUpload /> : <MyForm formData={formData} setFormData={setFormData} />}
        </SoftBox>
      </DialogContent>
      <DialogActions>
        {en && (
            <Button
            variant="contained"
            sx={{ color: "white !important" }}
            onClick={() => {
              setShowImg(!showImg);
              setEn(!en);
              handleSubmit(); // Move handleSubmit here
            }}
          >
            Next
          </Button>
          
        )}
        {!en && (
          <>
            <Button
              variant="contained"
              sx={{ color: "white !important" }}
              onClick={() => {
                setShowImg(!showImg);
                setEn(!en);
                onClose(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ color: "white !important" }}
              
            >
              Post
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
