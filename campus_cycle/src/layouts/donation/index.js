import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "./data/dataBarChart";
import SoftBox from "components/SoftBox";

import DonationCard from "./components/DonationCard";
import SideBar from "./components/SideBar";
import SideBarUnder from "./components/sideBarUnder";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

import axios from "axios";
import LOCAL_ADDR from "../../GLOBAL_ADDRESS";

import "./styles.css";

function Donation() {
  const [showMore, setShowMore] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const { chart } = reportsBarChartData;

  const [totalDonation, setTotalDonation] = useState("");
  const [donationToday, setDonationToday] = useState("");
  const [totalDonor, setTotalDonor] = useState("");
  const [avgDonation, setAvgDonation] = useState("");

  useEffect(() => {
    fetchDonationData();
  }, []);

  const fetchDonationData = async () => {
    try {
      const totalDonationResponse = await axios.get(`${LOCAL_ADDR}donation-amounts/all`);
      const donationTodayResponse = await axios.get(`${LOCAL_ADDR}donation-amounts/today`);
      const totalDonorResponse = await axios.get(`${LOCAL_ADDR}donation-amounts/total`);
      const avgDonationResponse = await axios.get(`${LOCAL_ADDR}donation-amounts/average`);

      setTotalDonation(totalDonationResponse.data);
      setDonationToday(donationTodayResponse.data);
      setTotalDonor(totalDonorResponse.data);
      setAvgDonation(avgDonationResponse.data.toString().substring(0, 5));
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: "Total Donation" }}
            count= {"৳  " + totalDonation}
            icon={{ color: "info", component: "paid" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: "Donation Today" }}
            count={"৳  " +donationToday}
            icon={{ color: "info", component: "calendar_today" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: "Total Donor" }}
            count={totalDonor}
            icon={{ color: "info", component: "group" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: "Avg Donation" }}
            count={"৳  " +avgDonation}
            icon={{ color: "info", component: "data_saver_off" }}
          />
        </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Grid container spacing={-2}>
                <DonationCard />
              </Grid>

              {/* bar chart */}
              <Grid item xs={9}>
                <div
                  style={{
                    width: "900px",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "800px", margin: "0 auto" }}>
                    <ReportsBarChart
                      title="active users"
                      description={
                        <>
                          (<strong>+23%</strong>) than last week
                        </>
                      }
                      chart={chart}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              {/* sidebar content */}
              <SideBar />
              <div style={{ marginTop: "16px" }}>
              </div>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Donation;
