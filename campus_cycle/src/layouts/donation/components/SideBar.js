import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader"; // Add this import
import Avatar from "@mui/material/Avatar"; // Add this import
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";

const SideBar = () => {
  const groups = [
    { name: "Group 1", color: "#ff0000" },
    { name: "Group 2", color: "#00ff00" },
    { name: "Group 3", color: "#0000ff" },
  ];

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
        {groups.map((item) => {
          return (
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: item.color, fontVariant: "small-caps" }}
                  aria-label="Group logo"
                >
                  {item.name.charAt(0)}
                </Avatar>
              }
              key={item.name}
              title={item.name}
            />
          );
        })}
      </CardContent>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px", padding: "10px" }}
      >
        <div className="glass-box glass-box-content">
          <div style={{ width: "85px", height: "95px" }}>
            <PaidIcon />
            <div style={{ fontSize: "12px", fontWeight: 'bold'}}>Total donation</div>
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
