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

const DonatePayment = ({ open, onClose, handleCustomInput, customAmount, setCustomAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard"); // State to hold the selected payment method

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value); // Update the selected payment method
  };

  return (
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
        <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          {/* Include other payment method options */}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonatePayment;
