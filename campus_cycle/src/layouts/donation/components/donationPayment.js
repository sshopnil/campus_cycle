import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const DonatePayment = ({ open, onClose, handleCustomInput, customAmount, setCustomAmount, postId }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard"); // State to hold the selected payment method

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value); // Update the selected payment method
  };

  const handleConfirm = async () => {
    const donorId = parseInt(localStorage.getItem("user")); // Convert donorId to number
    const amount = parseInt(customAmount); // Convert customAmount to number
    const donationId = parseInt(postId); // Convert postId to number
  
    const donationData = {
      amount,
      donorId,
      donationId
    };
  
    try {
      const response = await axios.post("http://localhost:5000/donation-amounts/create", donationData);
      console.log("Donation successful:", response.data);
      toast.success('Thank you for your contribution😊!');
      onClose(); // Close the dialog after successful donation
      window.location.reload();
    } catch (error) {
      console.error("Error donating:", error);
      toast.error('Transaction Failed 😿.');
      // Handle error or display error message to the user
    }
  };
  

  return (
    <>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: '400px' }}
      />
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "20px", // Rounded corners
          backdropFilter: "blur(1px)", // Glass effect
          backgroundColor: "rgba(255, 255, 255)", // Background color with transparency
        },
      }}
    >
      <DialogTitle>Donate Now</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Enter Donation Amount</Typography>
        {/* Custom amount input and other elements... */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <Button
        variant="outlined"
        style={{ borderRadius: "20px", marginRight: "10px", color: "black" }}
        onClick={() => handleCustomInput(10)}
      >
        $10
      </Button>
      <Button
        variant="outlined"
        style={{ borderRadius: "20px", marginRight: "10px", color: "black" }}
        onClick={() => handleCustomInput(20)}
      >
        $20
      </Button>
      <Button
        variant="outlined"
        style={{ borderRadius: "20px", marginRight: "10px", color: "black" }}
        onClick={() => handleCustomInput(50)}
      >
        $50
      </Button>
      <Button
        variant="outlined"
        style={{ borderRadius: "20px", marginRight: "10px", color: "black" }}
        onClick={() => handleCustomInput(100)}
      >
        $100
      </Button>
    </div>
    <div
      style={{
        marginTop: "10px",
        marginRight: "8px",
        display: "flex",
        alignItems: "center",
        borderRadius: "20px",
        border: "1px solid #ccc",
        padding: "5px",
      }}
    >
      <span style={{ marginRight: "5px" }}>$</span>
      <input
        type="number"
        min="0"
        step="1"
        placeholder="Custom amount"
        style={{ padding: "5px", width: "100px", border: "none", outline: "none" }}
        value={customAmount}
        onChange={(e) => setCustomAmount(e.target.value)}
      />
    </div>

        <Typography variant="body1" style={{ marginTop: "20px" }}>
          Select Payment Method
        </Typography>
        {/* Radio buttons for payment method selection... */}
        <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          {/* Include other payment method options */}
        </RadioGroup>
      </DialogContent>
      <DialogActions style={{padding: "20px"}}>
        <Button
          variant="contained"
          sx={{ color: "white !important" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ color: "white !important" }}
          onClick={handleConfirm} // Call handleConfirm function to submit donation
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default DonatePayment;
