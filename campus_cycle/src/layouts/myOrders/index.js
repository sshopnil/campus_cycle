import React, { useState, useEffect } from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import LOCAL_ADDR from 'GLOBAL_ADDRESS';

function MyOrders(){
    return(
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox pt={6} pb={3}>
                <SoftBox mb={3}>
                    <Typography variant="h5" color="text" fontWeight="medium">My orders</Typography>
                </SoftBox>
            </SoftBox>
            <Footer />
        </DashboardLayout>
    )
}
export default MyOrders;