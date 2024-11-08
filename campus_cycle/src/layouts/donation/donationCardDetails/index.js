import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography, Button, CardHeader } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ProgressBar from "@ramonak/react-progress-bar";
import DonatePayment from "../components/donationPayment";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import axios from "axios";
import LOCAL_ADDR from "../../../GLOBAL_ADDRESS";

const DonationCardDetails = () => {
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [showAllDonors, setShowAllDonors] = useState(false);
  const [donorsList, setDonorsList] = useState([]);

  const handleCustomInput = (amount) => {
    setCustomAmount(amount);
  };

  useEffect(() => {
    const fetchDonorsList = async () => {
      try {
        const response = await axios.get(`${LOCAL_ADDR}donation-amounts/donors/${cardId}`);
        setDonorsList(response.data);
      } catch (error) {
        console.error("Error fetching donors list:", error);
      }
    };

    fetchDonorsList();
  }, [cardId]);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`${LOCAL_ADDR}donations/${cardId}`);
        const cardData = response.data;

        setCardDetails({
          title: cardData.title,
          imageUrl: cardData.imageUrl,
          goalAmount: cardData.goalAmount,
          details: cardData.details,
          creator: {
            id: cardData.creator.id,
            name: cardData.creator.name,
            email: cardData.creator.email,
            dob: cardData.creator.dob,
            imageUrl: cardData.creator.imageUrl,
          },
          organizer: {
            id: cardData.organizer.id,
            name: cardData.organizer.name,
            email: cardData.organizer.email,
            dob: cardData.organizer.dob,
            imageUrl: cardData.organizer.imageUrl,
          },
        });

        const raisedResponse = await axios.get(`${LOCAL_ADDR}donation-amounts/total/${cardId}`);
        setRaisedAmount(raisedResponse.data);
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [cardId]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const toggleShowAllDonors = () => {
    setShowAllDonors(!showAllDonors);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2}>
        {cardDetails && (
          <>
            <Grid item md={8}>
              <Card sx={{ width: "100%" }}>
                <Typography
                  gutterBottom
                  variant="h2"
                  component="div"
                  sx={{ paddingLeft: "20px", paddingTop: "20px" }}
                >
                  {cardDetails.title}
                </Typography>
                <CardMedia
                  component="img"
                  alt="Card Image"
                  height="400"
                  image={cardDetails.imageUrl}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" style={{ marginTop: "30px" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ marginTop: "30px", marginBottom: "20px" }}
                    >
                      Content created by: {cardDetails.creator.name || "Unknown"}
                    </Typography>
                    <hr
                      style={{
                        width: "100%",
                        alignSelf: "center",
                        color: "#666C8F",
                        border: "1px solid",
                      }}
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ marginTop: "30px" }}>
                    {cardDetails.details}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "15px",
                      marginTop: "40px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      style={{ padding: "20px", width: "40%", color: "black" }}
                      onClick={handleOpenDialog}
                    >
                      Donate Now
                    </Button>
                  </div>
                  <hr
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      color: "#666C8F",
                      border: "1px solid",
                    }}
                  />
                  <Typography variant="body1" color="text.primary" style={{ marginTop: "30px" }}>
                    <div style={{ fontWeight: "bold" }}>Organizer</div>
                    <div style={{ padding: "15px" }}>
                      <Stack direction="row" spacing={2}>
                        <Avatar src={cardDetails.organizer.imageUrl} />
                        <div
                          style={{
                            paddingLeft: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {cardDetails.organizer.name || "Unknown"}
                        </div>
                      </Stack>
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card sx={{ minWidth: "100%", minHeight: "600px" }}>
                <Typography
                  style={{
                    padding: "15px",
                    fontWeight: "bold",
                    fontSize: "2rem",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  ${raisedAmount || 0}
                  <Typography color="text.secondary">
                    raised of ${cardDetails.goalAmount || 0} goal
                  </Typography>
                </Typography>
                <div
                  style={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    fontFamily: "Secondary Font, sans-serif",
                  }}
                >
                  <ProgressBar
                    completed={(raisedAmount / cardDetails.goalAmount) * 100}
                    bgColor="#17c1e8"
                    height="6px"
                    labelSize="0px"
                    borderRadius="8px"
                    customLabel={raisedAmount}
                  />
                </div>
                <div style={{ padding: "15px" }}>
                  <Button
                    variant="contained"
                    disableElevation
                    style={{
                      padding: "20px",
                      width: "100%",
                      color: "white",
                      fontSize: "1rem",
                      backgroundColor: "#f99a32",
                    }}
                    onClick={handleOpenDialog}
                  >
                    Donate Now
                  </Button>
                </div>
                <CardContent
                  style={{
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CardHeader
                    sx={{
                      alignSelf: "center",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                    avatar={<RecordVoiceOverIcon fontSize="200px" />}
                    title="Top Donors"
                  />
                  <hr
                    style={{
                      width: "80%",
                      alignSelf: "center",
                      color: "#666C8F",
                      border: "1px solid",
                    }}
                  />
                  <div style={{ width: "100%", maxWidth: "350px", overflowY: "auto" }}>
                    {donorsList.slice(0, showAllDonors ? donorsList.length : 5).map((donor) => (
                      <CardHeader
                        key={donor.id}
                        avatar={<Avatar alt={donor.name} src={donor.imageUrl} />}
                        title={donor.name}
                      />
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                      {donorsList.length > 5 && (
                        <Button variant="outlined"
                        style={{
                          padding: "20px",
                          width: "100%",
                          color: "black",
                        }}
                         onClick={toggleShowAllDonors}>
                          {showAllDonors ? "Show less" : "Show more"}
                        </Button>
                      )}
                    </div>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>

      <DonatePayment
        open={dialogOpen}
        onClose={handleCloseDialog}
        handleCustomInput={handleCustomInput}
        customAmount={customAmount}
        setCustomAmount={setCustomAmount}
        postId={cardId}
      />
    </DashboardLayout>
  );
};

export default DonationCardDetails;
