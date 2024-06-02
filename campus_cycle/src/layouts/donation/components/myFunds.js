import React, { useState, useEffect } from "react";
import { Grid, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LOCAL_ADDR from "../../../GLOBAL_ADDRESS";

const login = parseInt(localStorage.getItem("user")); // Assuming user is stored as a JSON string

const MyFunds = () => {
  const [cardsData, setCardsData] = useState([]);
  const [raisedData, setRaisedData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showMore, setShowMore] = useState(3);
  const [remainingCardData, setRemainingCardData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${LOCAL_ADDR}donations`);
      const userCards = response.data.filter((card) => {
        return card.organizer?.id === login;
      });
      setCardsData(userCards);
      setRemainingCardData(userCards.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchRaisedDataForAllCards = async () => {
      try {
        const promises = cardsData.map(async (card) => {
          const response = await axios.get(`${LOCAL_ADDR}donation-amounts/total/${card.id}`);
          return { id: card.id, raisedAmount: response.data };
        });
        const raisedDataForAllCards = await Promise.all(promises);
        setRaisedData(raisedDataForAllCards);
      } catch (error) {
        console.error("Error fetching raised data:", error);
      }
    };

    fetchRaisedDataForAllCards();
  }, [cardsData]);

  const visibleCards = showAll ? cardsData : cardsData.slice(0, showMore);

  const handleCardClick = (id) => {
    navigate(`/DonationCardDetails/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this donation?");
    if (confirmDelete) {
      try {
        await axios.delete(`${LOCAL_ADDR}donations/${parseInt(id)}`);
        // If the delete request is successful, update the state to remove the deleted card
        setCardsData(cardsData.filter((card) => card.id !== id));
        window.location.reload();
      } catch (error) {
        console.error("Error deleting donation:", error);
      }
    }
  };
  

  return (
    <>
      <Grid container spacing={2}>
        {visibleCards.map((card) => (
          <Grid key={card.id} item xs={12} md={4} style={{ marginBottom: "40px" }}>
            <div onClick={() => handleCardClick(card.id)} style={{ cursor: "pointer" }}>
              <Card
                sx={{
                  maxWidth: 280,
                  height: 380, // Adjusted height to accommodate the delete button
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "10px",
                  position: "relative",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  alt="Image"
                  height="180"
                  image={card.imageUrl || "https://via.placeholder.com/280x180"}
                />
                <CardContent style={{ position: "relative" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ marginBottom: "20px" }}
                  >
                    {card.title.length > 20 ? `${card.title.substring(0, 1)}...` : card.title}
                  </Typography>
                  <Typography style={{ marginBottom: "8px", fontSize: "0.9rem" }}>
                    ${card.goalAmount} of{" "}
                    {raisedData.find((data) => data.id === card.id)?.raisedAmount || 0} is raised
                  </Typography>
                  <ProgressBar
                    completed={
                      ((raisedData.find((data) => data.id === card.id)?.raisedAmount || 0) /
                        card.goalAmount) *
                      100
                    }
                    bgColor="#17c1e8"
                    height="6px"
                    labelSize="0px"
                    borderRadius="8px"
                    customLabel={raisedData.find((data) => data.id === card.id)?.raisedAmount || 0}
                    style={{ position: "absolute", bottom: "0", left: "0", right: "0" }}
                  />
                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from triggering the card click
                      handleDelete(card.id);
                    }}
                    variant="contained"
                    color="secondary"
                    style={{
                      margin: "22px",
                      color: "white",
                      backgroundColor: "red",
                      position: "absolute",
                      right: "0",
                    }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>

      {!showAll ? (
        <Grid container justifyContent="center" mt={2}>
          <Button
            onClick={() => {
              if (remainingCardData < 6) {
                setShowMore(remainingCardData);
                setShowAll(true);
              } else {
                setShowMore(remainingCardData < 6 ? remainingCardData : showMore + 6);
                setRemainingCardData(remainingCardData - showMore);
              }
            }}
            variant="secondary"
          >
            See More
          </Button>
        </Grid>
      ) : (
        <Grid container justifyContent="center" mt={2}>
          <Button
            onClick={() => {
              setShowAll(false);
              setShowMore(3);
              setRemainingCardData(cardsData.length);
            }}
            variant="secondary"
          >
            See Less
          </Button>
        </Grid>
      )}
    </>
  );
};

export default MyFunds;
