import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChairIcon from '@mui/icons-material/Chair';
import TableChartIcon from '@mui/icons-material/TableChart';
import BedIcon from '@mui/icons-material/Bed';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

function FilterBar({ onSelectFilter }) {
  // // State to track the active button
  const [activeButton, setActiveButton] = useState(null);

  // Function to handle button click
  // Function to handle button click
const handleButtonClick = ({ name, value }) => {
  setActiveButton(name); // Set active button based on name
  onSelectFilter({name: name, value: value}); // Call onSelectFilter function with value
};

  // Set 'All' button as active initially
  useEffect(() => {
    setActiveButton('All');
  }, []);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        Type
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          size="small"
          startIcon={<CalendarMonthIcon />}
          style={{
            backgroundColor: activeButton === 'All' ? '#17C1E8' : '#EAE8E8',
            color: activeButton === 'All' ? 'white' : '#666C8F'
          }}
          onClick={() => handleButtonClick({name: 'All', value: 0})}
        >
          All
        </Button>
      </Grid>
      {/* <Grid item>
        <Button
          variant="contained"
          size="small"
          startIcon={<CalendarTodayIcon />}
          style={{
            backgroundColor: activeButton === 'Today' ? '#17C1E8' : '#EAE8E8',
            color: activeButton === 'Today' ? 'white' : '#666C8F'
          }}
          onClick={() => handleButtonClick({name: 'Today'})}
        >
          Today
        </Button>
      </Grid>  */}
      <Grid item>
      <Button
        variant="contained"
        size="small"
        startIcon={<ChairIcon />}
        style={{
          backgroundColor: activeButton === 'Chair' ? '#17C1E8' : '#EAE8E8',
          color: activeButton === 'Chair' ? 'white' : '#666C8F'
        }}
        onClick={() => handleButtonClick({ name: 'Chair', value: 1 })} // Pass both name and value
      >
        Chair
      </Button>

      </Grid>
      <Grid item>
      <Button
        variant="contained"
        size="small"
        startIcon={<ChairIcon />}
        style={{
          backgroundColor: activeButton === 'Table' ? '#17C1E8' : '#EAE8E8',
          color: activeButton === 'Table' ? 'white' : '#666C8F'
        }}
        onClick={() => handleButtonClick({ name: 'Table', value: 2 })} // Pass both name and value
      >
        Table
      </Button>

      </Grid>
      <Grid item>
      <Button
        variant="contained"
        size="small"
        startIcon={<ChairIcon />}
        style={{
          backgroundColor: activeButton === 'Bed' ? '#17C1E8' : '#EAE8E8',
          color: activeButton === 'Bed' ? 'white' : '#666C8F'
        }}
        onClick={() => handleButtonClick({ name: 'Bed', value: 3 })} // Pass both name and value
      >
        Bed
      </Button>

      </Grid>

      <Grid item>
      <Button
        variant="contained"
        size="small"
        startIcon={<ChairIcon />}
        style={{
          backgroundColor: activeButton === 'Other' ? '#17C1E8' : '#EAE8E8',
          color: activeButton === 'Other' ? 'white' : '#666C8F'
        }}
        onClick={() => handleButtonClick({ name: 'Other', value: 4 })} // Pass both name and value
      >
        Other
      </Button>

      </Grid>
    </Grid>
  );
}

// Prop types validation for FilterBar
FilterBar.propTypes = {
  onSelectFilter: PropTypes.func.isRequired, // Ensure onSelectFilter is a function and is required
};

export default FilterBar;
