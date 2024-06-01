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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [totalDonation, setTotalDonation] = useState("");
  const [donationToday, setDonationToday] = useState("");
  const [totalDonor, setTotalDonor] = useState("");
  const [avgDonation, setAvgDonation] = useState("");

  useEffect(() => {
    fetchTotalDonation();
    fetchDonationToday();
    fetchTotalDonor();
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
    try {
      const response = await axios.get(`${LOCAL_ADDR}donation-amounts/today`);
      setDonationToday(response.data);
    } catch (error) {
      console.error("Error fetching donation today:", error);
    }
  };

  const fetchTotalDonor = async () => {
    try {
      const response = await axios.get(`${LOCAL_ADDR}donation-amounts/total`);
      setTotalDonor(response.data);
    } catch (error) {
      console.error("Error fetching total donor:", error);
    }
  };

  const fetchAvgDonation = async () => {
    try {
      const response = await axios.get(`${LOCAL_ADDR}donation-amounts/average`);
      setAvgDonation(response.data);
    } catch (error) {
      console.error("Error fetching average donation:", error);
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
      <PostForm open={isPopupOpen} onClose={handleClosePopup} />
      <div style={{ padding: "10px" }}>
        {/* Total Donation */}
        <DonationUpdates title="Total Donation" amount={totalDonation} />
        {/* Donation Today */}
        <DonationUpdates title="Donation Today" amount={donationToday} />
        {/* Total Donor */}
        <DonationUpdates title="Total Donor" amount={totalDonor} />
        {/* Avg Donation */}
        <DonationUpdates title="Avg Donation" amount={avgDonation.toString().substring(0, 5)} />
      </div>
    </Card>
  );
};

export default SideBarUnder;
