import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ButtonSizes(varient, size, name) {
  return (
    <Box sx={{ '& button': { m: 1 } }}>
      
      <div>
        <Button variant={varient} size={size}>
          {name}
        </Button>
      </div>
    </Box>
  );
}