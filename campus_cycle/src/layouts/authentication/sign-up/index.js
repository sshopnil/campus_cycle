
import { useState, useEffect } from "react";
import React from "react";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import ImageUpload from "layouts/discussion/components/image_upload";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import LOCAL_ADDR from "GLOBAL_ADDRESS";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignUp() {
  const navigate = useNavigate();

  const [agreement, setAgremment] = useState(true);
  const [uni, setUni] = useState(null);
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LOCAL_ADDR}universities`);
        setUni(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // console.log(uni);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    imageUrl: '',
    universityId: null,
    phoneNo: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    setFormData({ ...formData, [name]: value });
    // fetchData();
    // console.log(pass);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (cpass == pass) {
      formData.password = pass;
      formData.phoneNo = formData.phoneNo;

      formData.dob = new Date(formData.dob).toISOString();

      formData.universityId = parseInt(formData.universityId);
      // console.log(formData);
      try {
        const response = await axios.post(`${LOCAL_ADDR}users/signup`, formData);
        setFormData({
          name: '',
          email: '',
          password: '',
          dob: '',
          universityId: null,
          phoneNo: ''
        });
        if (response.statusText === "Created") {
          toast('Successfully signed up😎!');
            const delayInMilliseconds = 5000;
        
            const timeoutId = setTimeout(() => {
              navigate('/');
            }, delayInMilliseconds);
            return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error('API error:', error);
      }
    }
    else {
      toast('Passwords do not match😔!');
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox> */}
        {/* <Separator /> */}

        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleFormSubmit}>
            <SoftBox mb={2}>
              <SoftInput placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
            </SoftBox>
            <SoftBox mb={2}>
              <select
                style={{ width: "100%", height: 40, borderRadius: 10, borderColor: '#bebebe', transitionTimingFunction: 'ease-in-out', padding: 10 }}
                name="universityId"
                onClick={handleInputChange}
              >
                {
                  uni?.map((item) => {
                    return <option key={item?.id} value={item?.id} style={{ padding: 20 }}>{item?.fullName}</option>
                  })
                }
              </select>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput placeholder="Mobile" type="text" name="phoneNo" onChange={handleInputChange} value={formData.phoneNo} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Confirm Password" onChange={e => setCpass(e.target.value)} />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
