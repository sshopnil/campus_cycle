import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import jsonData from "../data/data.json";
import img from "../data/bruce-mars.jpg";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate, useParams } from "react-router-dom";
import Link from "@mui/material/Link";

const DonationCard = () => {
  const [cardsData, setCardsData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showMore, setShowMore] = useState(3);
  const [remainingCardData, setRemainingCardData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCardsData(jsonData);
    setRemainingCardData(jsonData.length);
  }, []);

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
              <CardMedia component="img" alt="Image" height="180" image={img} />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ marginBottom: "20px" }}
                >
                  {card.title}
                </Typography>
                <Typography style={{ marginBottom: "8px", fontSize: "0.9rem" }}>
                  ${card.progress.goal} of ${card.progress.current} is raised
                </Typography>
                <ProgressBar
                  completed={(card.progress.current / card.progress.goal) * 100}
                  bgColor="#17c1e8"
                  height="6px"
                  labelSize="0px"
                  borderRadius="8px"
                  customLabel={card.progress.current}
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
