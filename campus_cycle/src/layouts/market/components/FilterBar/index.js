import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChairIcon from '@mui/icons-material/Chair';
import TableChartIcon from '@mui/icons-material/TableChart';
import BedIcon from '@mui/icons-material/Bed';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

function FilterBar({ onSelectFilter }) {
  // State to track the active button
  const [activeButton, setActiveButton] = useState(null);
  const [open, setOpen] = useState(false); // State to handle dialog open/close
  const [searchText, setSearchText] = useState(''); // State to handle search text
  const [minPrice, setMinPrice] = useState(''); // State to handle min price
  const [maxPrice, setMaxPrice] = useState(''); // State to handle max price

  // Function to handle button click
  const handleButtonClick = ({ name, value }) => {
    setActiveButton(name); // Set active button based on name
    onSelectFilter({ name: name, value: value }); // Call onSelectFilter function with value
  };

  // Function to handle dialog open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle filter apply
  const handleFilterApply = () => {
    onSelectFilter({ name: 'Filter', searchText, minPrice, maxPrice });
    handleClose();
  };

  // Set 'All' button as active initially
  useEffect(() => {
    setActiveButton('All');
  }, []);

  return (
    <>
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
            onClick={() => handleButtonClick({ name: 'All', value: 0 })}
          >
            All
          </Button>
        </Grid>
        
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
            startIcon={<TableChartIcon />}
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
            startIcon={<BedIcon />}
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
        <Grid item>
          <Button
            variant="contained"
            size="small"
            startIcon={<FilterAltOutlinedIcon />}
            style={{
              backgroundColor: activeButton === 'Filter' ? '#17C1E8' : '#EAE8E8',
              color: activeButton === 'Filter' ? 'white' : '#666C8F'
            }}
            onClick={handleClickOpen}
          >
            Filter
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use the fields below to filter the items.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="search"
            label="Search"
            type="text"
            fullWidth
            variant="standard"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="min-price"
                label="Min Price"
                type="number"
                fullWidth
                variant="standard"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="max-price"
                label="Max Price"
                type="number"
                fullWidth
                variant="standard"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFilterApply}>Apply</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

// Prop types validation for FilterBar
FilterBar.propTypes = {
  onSelectFilter: PropTypes.func.isRequired, // Ensure onSelectFilter is a function and is required
};

export default FilterBar;
