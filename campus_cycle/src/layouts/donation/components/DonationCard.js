import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LOCAL_ADDR from "../../../GLOBAL_ADDRESS"

const DonationCard = () => {
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
      setCardsData(response.data);
      setRemainingCardData(response.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRaisedData = async (id) => {
    try {
      const response = await axios.get(`${LOCAL_ADDR}donation-amounts/total/${id}`);
      setRaisedData((prevState) => [...prevState, { id, raisedAmount: response.data }]);
    } catch (error) {
      console.error("Error fetching raised data:", error);
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

  return (
    <>
      {visibleCards.map((card) => (
        <Grid key={card.id} item xs={12} md={4} style={{ marginBottom: "40px" }}>
          <div onClick={() => handleCardClick(card.id)} style={{ cursor: "pointer" }}>
            <Card
              sx={{
                maxWidth: 280,
                height: 350,
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
                image={card.imageUrl || 'https://via.placeholder.com/280x180'} 
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ marginBottom: "20px" }}
                >
                {card.title.length > 20 ? `${card.title.substring(0, 54)}...` : card.title}
                </Typography>
                <Typography style={{ marginBottom: "8px", fontSize: "0.9rem" }}>
                  ${card.goalAmount} of {raisedData.find(data => data.id === card.id)?.raisedAmount || 0} is raised
                </Typography>
                <ProgressBar
                  completed={(raisedData.find(data => data.id === card.id)?.raisedAmount || 0) / card.goalAmount * 100}
                  bgColor="#17c1e8"
                  height="6px"
                  labelSize="0px"
                  borderRadius="8px"
                  customLabel={raisedData.find(data => data.id === card.id)?.raisedAmount || 0}
                  style={{ position: "absolute", bottom: "0", left: "0", right: "0" }}
                />
              </CardContent>
            </Card>
          </div>
        </Grid>
      ))}

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

export default DonationCard;
