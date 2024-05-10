import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Avatar, Button, Dialog } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import FundForm from "./fundForm/fundForm";
import axios from "axios";
import LOCAL_ADDR from "../../../GLOBAL_ADDRESS";
import { CardBody, Typography } from "@material-tailwind/react";
import PostForm from "./post_form";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import UpdateCard from "./updateCards"

const SideBar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the visibility of the popup
  const [topDonors, setTopDonors] = useState([]);
  const [totalDonation, setTotalDonation] = useState("");
  const [donationToday, setDonationToday] = useState("");
  const [totalDonner, setTotalDonner] = useState("");
  const [avgDonation, setAvgDonation] = useState("");

  useEffect(() => {
    fetchTopDonors();
    fetchTotalDonation();
    fetchDonationToday();
    fetchTotalDonner();
    fetchAvgDonation();
  }, []);

  const fetchTopDonors = async () => {
    try {
      const response = await axios.get(`${LOCAL_ADDR}donation-amounts/top-donor-whole`);
      const donorIds = response.data.slice(0, 5).map((donor) => donor.donorId);
      const donorsDetails = await Promise.all(
        donorIds.map(async (id) => {
          const userDetails = await axios.get(`${LOCAL_ADDR}users/${id}`);
          return userDetails.data;
        })
      );
      setTopDonors(donorsDetails);
    } catch (error) {
      console.error("Error fetching top donors:", error);
    }
  };

  const fetchTotalDonation = async () => {
    try {
      const response = await axios.get(`${LOCAL_ADDR}donation-amounts/all`);
      setTotalDonation(response.data);
    } catch (error) {
      console.error("Error fetching total donation:", error);
    }
  };

  const fetchDonationToday = async () => {
    // Implement logic to fetch donation today
  };

  const fetchTotalDonner = async () => {
    // Implement logic to fetch total donner
  };

  const fetchAvgDonation = async () => {
    // Implement logic to fetch avg donation
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
            width: "220px", // Increased width for a more prominent appearance
            background: "#f99a32", // Slightly transparent background
            backdropFilter: "blur(10px)", // Apply glass effect
            border: "1px solid rgba(255, 255, 255, 0.3)", // Thicker border for contrast
            color: "black", // Set text color to black
            fontWeight: "bold", // Set text weight to bold
            borderRadius: "8px", // Rounded corners
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
          }}
          onClick={handleOpenPopup} // Open the popup on button click
        >
          <PlaylistAddCircleIcon fontSize="large" style={{ marginRight: "8px" }} />{" "}
          {/* Larger icon with some margin */}
          Start a Fund
        </Button>
      </div>

      {/* ProductForm Popup */}
      <PostForm open={isPopupOpen} onClose={handleClosePopup} />

      {/* List of sections */}
      <div style={{ padding: "10px" }}>
        {/* Total Donation */}
        <div
          className="glass-box glass-box-content"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <PaidIcon style={{ width: "40px", height: "40px", marginRight: "10px" }} />
            <div style={{ fontSize: "12px", fontWeight: "bold" }}>Total donation</div>
          </div>
          <div style={{ fontSize: "12px", marginTop: "8px" }}>${totalDonation}</div>
        </div>
        {/* Donation Today */}
        <div
          className="glass-box glass-box-content"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <CalendarTodayIcon style={{ width: "40px", height: "40px", marginRight: "10px" }} />
            <div style={{ fontSize: "12px" }}>Donation today</div>
          </div>
          <div style={{ fontSize: "12px", marginTop: "8px" }}>{donationToday}</div>
        </div>
        {/* Total Donner */}
        <div
          className="glass-box glass-box-content"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <GroupIcon style={{ width: "40px", height: "40px", marginRight: "10px" }} />
            <div style={{ fontSize: "12px" }}>Total donner</div>
          </div>
          <div style={{ fontSize: "12px", marginTop: "8px" }}>{totalDonner}</div>
        </div>
        {/* Avg Donation */}
        <div
          className="glass-box glass-box-content"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <DataSaverOffIcon style={{ width: "40px", height: "40px", marginRight: "10px" }} />
            <div style={{ fontSize: "12px" }}>Avg donation</div>
          </div>
          <div style={{ fontSize: "12px", marginTop: "8px" }}>{avgDonation}</div>
        </div>
        <UpdateCard/>
      </div>
    </Card>
  );
};

export default SideBar;
