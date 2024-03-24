// CardComponent.js
import React from 'react';
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ProgressBar from "@ramonak/react-progress-bar";

function CardComponent({ card }) {
  return (
    <Grid key={card.id} item xs={12} md={4} style={{ marginBottom: "40px" }}>
      <Card sx={{ maxWidth: 280 }}>
        <CardMedia
          component="img"
          alt="Image"
          height="180"
          image={card.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.description}
          </Typography>
          <ProgressBar completed={card.progress.current} />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardComponent;
