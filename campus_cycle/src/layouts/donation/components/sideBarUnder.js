import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import axios from "axios";
import LOCAL_ADDR from "../../../GLOBAL_ADDRESS";
import PostForm from "./post_form";
import DonationUpdates from "./donationUpdates";

const SideBarUnder = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the visibility of the popup
  const [totalDonation, setTotalDonation] = useState("");
  const [donationToday, setDonationToday] = useState("");
  const [totalDonner, setTotalDonner] = useState("");
  const [avgDonation, setAvgDonation] = useState("");

  useEffect(() => {
    fetchTotalDonation();
    fetchDonationToday();
    fetchTotalDonner();
    fetchAvgDonation();
  }, []);

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
      {/* ProductForm Popup */}
      <PostForm open={isPopupOpen} onClose={handleClosePopup} />

      {/* List of sections */}
      <div style={{ padding: "10px" }}>
        {/* Total Donation */}
          <DonationUpdates amount={totalDonation}  />
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
      </div>
    </Card>
  );
};

export default SideBarUnder;
