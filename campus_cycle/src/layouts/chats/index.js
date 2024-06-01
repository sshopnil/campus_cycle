
// import React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Typography } from "@mui/material";
import Chat from "./Chat";
import Login from "./Login/Login";



function Chats() {
    const [user, setUser] = useState(null);

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <Grid item lg={12} sx={{justifyItems:"center"}} mt={10}>
        {user ? <Chat user={user} /> : <Login setUser={setUser} />}
        </Grid>
    </DashboardLayout>
  );
}

export default Chats;
