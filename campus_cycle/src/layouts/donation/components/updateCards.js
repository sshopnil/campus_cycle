import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';

export default function UpdateCard() {
  return (
    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" variant="determinate" value={20}>
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography variant="body1">Gross profit</Typography>
          <Typography variant="h2">$ 432.6M</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button variant="soft" size="small">
          Add to Watchlist
        </Button>
        <Button variant="solid" size="small">
          See breakdown
        </Button>
      </CardActions>
    </Card>
  );
}
