import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

export default function UpdateCard({title, amount}) {
  return (
    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CardContent>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="h2"> <VolunteerActivismIcon /> $  {amount}</Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
}
