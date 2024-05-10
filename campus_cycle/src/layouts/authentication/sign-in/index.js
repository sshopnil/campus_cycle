
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import axios from "axios";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LOCAL_ADDR from "GLOBAL_ADDRESS";
import { useNavigate } from 'react-router-dom';
import { Widgets } from "@mui/icons-material";


function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // fetchData();
    // console.log(pass);
  };
  // onClick = {()=> localStorage.setItem("user", "user")} 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(`${LOCAL_ADDR}users/signin`, formData);
      // console.log(response.status);
        toast('Successfully signed in😆!');
        console.log(response.data.id);
        localStorage.setItem("user", response.data.id);
        const delayInMilliseconds = 3000;

        const timeoutId = setTimeout(() => {
          navigate('/dashboard');
        }, delayInMilliseconds);
        return () => clearTimeout(timeoutId);
      }
      catch (error) {
      if(error.response.statusText === "Not Found"){
        toast.warn('Password does not match😔!');
      }
      console.error('API error:', error.response);
    }
  };

return (
  <CoverLayout
    title="Welcome back"
    description="Enter your email and password to sign in"
    image={curved9}
  >
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
      style={{width: "400px"}}
    />
    <SoftBox component="form" role="form" onSubmit={handleFormSubmit}>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Email
          </SoftTypography>
        </SoftBox>
        <SoftInput type="email" placeholder="Email" name="email" onChange={handleInputChange}/>
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Password
          </SoftTypography>
        </SoftBox>
        <SoftInput type="password" placeholder="Password" name="password" onChange={handleInputChange}/>
      </SoftBox>
      <SoftBox display="flex" alignItems="center">
        <Switch checked={rememberMe} onChange={handleSetRememberMe} />
        <SoftTypography
          variant="button"
          fontWeight="regular"
          onClick={handleSetRememberMe}
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          &nbsp;&nbsp;Remember me
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" type="submit" fullWidth>
            sign in
          </SoftButton>
      </SoftBox>
      <SoftBox mt={3} textAlign="center">
        <SoftTypography variant="button" color="text" fontWeight="regular">
          Don&apos;t have an account?{" "}
          <SoftTypography
            component={Link}
            to="/authentication/sign-up"
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
          >
            Sign up
          </SoftTypography>
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  </CoverLayout>
);
}

export default SignIn;
