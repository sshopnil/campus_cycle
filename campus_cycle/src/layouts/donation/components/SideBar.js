import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import FundForm from "./fundForm/fundForm";
import axios from "axios";

const SideBar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the visibility of the popup
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    fetchTopDonors();
  }, []);

  const fetchTopDonors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/donation-amounts/top-donor-whole");
      const donorIds = response.data.map((donor) => donor.donorId);
      const donorsDetails = await Promise.all(
        donorIds.map(async (id) => {
          const userDetails = await axios.get(`http://localhost:3000/users/${id}`);
          return userDetails.data;
        })
      );
      setTopDonors(donorsDetails);
    } catch (error) {
      console.error("Error fetching top donors:", error);
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Card sx={{ minWidth: "300px" }}>
      <CardHeader
        sx={{
          alignSelf: "center",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
        avatar={<RecordVoiceOverIcon fontSize="200px" />}
        title="Top Donors"
      />
      <hr style={{ width: "80%", alignSelf: "center", color: "#666C8F", border: "1px solid" }} />
      <CardContent style={{ height: "400px", overflowY: "auto" }}>
        {topDonors.map((donor) => (
          <CardHeader
            key={donor.id}
            avatar={<Avatar alt={donor.name} src={donor.imageUrl} />}
            title={donor.name}
          />
        ))}
      </CardContent>
      {/* "Start a Fund" Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "200px", // Adjust the width as needed
            background: "rgba(255, 255, 255, 0.1)", // Apply glass effect
            backdropFilter: "blur(10px)", // Apply glass effect
            border: "1px solid rgba(255, 255, 255, 0.2)", // Apply glass effect
            color: "black", // Set text color to black
            fontWeight: "bold", // Set text weight to bold
          }}
          onClick={handleOpenPopup} // Open the popup on button click
        >
          Start a Fund
        </Button>
      </div>
      {/* ProductForm Popup */}
      <Dialog open={isPopupOpen} onClose={handleClosePopup}>
        <FundForm />
      </Dialog>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px", padding: "10px" }}
      >
        <div className="glass-box glass-box-content">
          <div style={{ width: "85px", height: "95px" }}>
            <PaidIcon />
            <div style={{ fontSize: "12px", fontWeight: "bold" }}>Total donation</div>
          </div>
          {/* Add content for Total donation */}
        </div>
        <div className="glass-box glass-box-content">
          <div style={{ width: "85px", height: "95px" }}>
            <CalendarTodayIcon />
            <div style={{ fontSize: "12px" }}>Donation today</div>
          </div>
          {/* Add content for Donation today */}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <div className="glass-box glass-box-content">
          <div style={{ width: "85px", height: "95px" }}>
            <GroupIcon />
            <div style={{ fontSize: "12px" }}>Total donner</div>
          </div>
          {/* Add content for Total donner */}
        </div>
        <div className="glass-box glass-box-content">
          <div style={{ width: "85px", height: "95px" }}>
            <DataSaverOffIcon />
            <div style={{ fontSize: "12px" }}>Avg donation</div>
          </div>
          {/* Add content for Avg donation */}
        </div>
      </div>
    </Card>
  );
};

export default SideBar;
