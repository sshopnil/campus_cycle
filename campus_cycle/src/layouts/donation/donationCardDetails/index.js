import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import CardHeader from "@mui/material/CardHeader";
import jsonData from "../data/data.json";
import img from "../data/bruce-mars.jpg";
import ProgressBar from "@ramonak/react-progress-bar";
import Button from "@mui/material/Button";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const DonationCardDetails = () => {
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    const selectedCard = jsonData.find((card) => card.id === parseInt(cardId));
    setCardDetails(selectedCard);
  }, [cardId]);

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
                  image={img}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" style={{ marginTop: "30px" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ marginTop: "30px", marginBottom: "20px" }}
                    >
                      Content crated by: NAME NAME
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
                    {cardDetails.description}
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
                        <Avatar src="/broken-image.jpg" />
                        <div
                          style={{
                            paddingLeft: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Sahadat Islama Evan
                        </div>
                      </Stack>
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card sx={{ minWidth: "300px" }}>
                <Typography
                  style={{
                    padding: "15px",
                    fontWeight: "bold",
                    fontSize: "2rem",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  ${cardDetails.progress.current}
                  <Typography color="text.secondary">
                    raised of ${cardDetails.progress.goal} goal
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
                    completed={(cardDetails.progress.current / cardDetails.progress.goal) * 100}
                    bgColor="#17c1e8"
                    height="6px"
                    labelSize="0px"
                    borderRadius="8px"
                    customLabel={cardDetails.progress.current}
                  />
                </div>
                <div style={{ padding: "15px" }}>
                  <Button
                    variant="contained"
                    disableElevation
                    style={{
                      padding: "20px",
                      width: "100%",
                      color: "black",
                      fontSize: "1rem",
                      backgroundColor: "#f99a32",
                    }}
                  >
                    Donate Now
                  </Button>
                </div>

                <CardContent style={{ height: "400px", overflowY: "auto" }}></CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </DashboardLayout>
  );
};

export default DonationCardDetails;
