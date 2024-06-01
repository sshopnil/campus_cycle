import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import axios from "axios";
import LOCAL_ADDR from "../../../GLOBAL_ADDRESS";
import PostForm from "./post_form";
import QueueIcon from "@mui/icons-material/Queue";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import MyFunds from "./myFunds"; // Assuming this is the path to your MyFunds component

const SideBar = () => {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false); // State to control the visibility of the PostForm popup
  const [isMyFundsOpen, setIsMyFundsOpen] = useState(false); // State to control the visibility of the MyFunds popup
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    fetchTopDonors();
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

  const handleOpenPostForm = () => {
    setIsPostFormOpen(true);
  };

  const handleClosePostForm = () => {
    setIsPostFormOpen(false);
  };

  const handleOpenMyFunds = () => {
    setIsMyFundsOpen(true);
  };

  const handleCloseMyFunds = () => {
    setIsMyFundsOpen(false);
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
      <CardContent style={{ height: "350px", overflowY: "auto" }}>
        {topDonors.slice(0, 5).map((donor) => (
          <CardHeader
            key={donor.id}
            avatar={<Avatar alt={donor.name} src={donor.imageUrl} />}
            title={donor.name}
          />
        ))}
      </CardContent>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="outlined"
          color="error"
          sx={{
            margin: "10px",
            padding: "20px",
            width: "220px",
            backdropFilter: "blur(10px)",
            borderColor: "#ba165b",
            color: "#ba165b",
            "&:hover": {
              backgroundColor: "#ffbd03",
              borderColor: "#ffbd03",
              color: "#fff",
            },
            fontWeight: "bold",
            fontSize: "18px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onClick={handleOpenPostForm}
        >
          <QueueIcon sx={{ fontSize: "100px", marginRight: "8px" }} />
          Start a Fund
        </Button>
      </div>
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <Button
          variant="outlined"
          color="error"
          sx={{
            margin: "10px",
            padding: "20px",
            width: "220px",
            backdropFilter: "blur(10px)",
            borderColor: "#5adbb5",
            color: "gray",
            "&:hover": {
              backgroundColor: "#5adbb5",
              borderColor: "#5adbb5",
              color: "#fff",
            },
            fontWeight: "bold",
            fontSize: "18px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onClick={handleOpenMyFunds}
        >
          <DynamicFeedIcon sx={{ fontSize: "large", marginRight: "8px" }} />
          My Funds
        </Button>
      </div>

      <PostForm open={isPostFormOpen} onClose={handleClosePostForm} />

      <Dialog open={isMyFundsOpen} onClose={handleCloseMyFunds} maxWidth="md" fullWidth>
        <DialogContent>
          <MyFunds />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SideBar;
