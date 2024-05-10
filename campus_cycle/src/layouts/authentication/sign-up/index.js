
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import ImageUpload from "layouts/discussion/components/image_upload";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [img, setImg] = useState();
  // console.log(img);
  // body.name,
  //     body.email,
  //     body.dob,
  //     body.password,
  //     body.imageUrl,
  //     body.universityId,
  //     body.phoneNo,

  const handleSetAgremment = () => setAgremment(!agreement);
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
    // console.log(formData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual backend API endpoint
      const response = await axios.post(`signup`, formData);
      // console.log('API response:', response.data);

      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        dob: '',
        imageUrl: '',
        universityId: null,
        phoneNo: ''
      });

      // Handle success (e.g., redirect user, show success message)
    } catch (error) {
      console.error('API error:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
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

        <form onSubmit={handleFormSubmit}>
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
              </SoftBox>
              <SoftBox mb={2}>
                <select style={{ width: "100%", height: 40, borderRadius: 10, borderColor: '#bebebe', transitionTimingFunction: 'ease-in-out' }}>
                  <option value="someOption">Some option</option>
                  <option value="otherOption">Other option</option>
                </select>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput placeholder="Mobile" type="number" />
              </SoftBox>
              <SoftBox mb={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <label style={{ fontSize: 14, alignSelf: "center", color: "lightgray" }}>DOB</label>
                    <DatePicker sx={{ marginLeft: "auto" }} />
                  </DemoContainer>
                </LocalizationProvider>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput type="password" placeholder="Password" />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput type="password" placeholder="Confirm Password" />
              </SoftBox>
              <SoftBox mb={2}>
                <ImageUpload setImg={setImg} />
              </SoftBox>
              {/* <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox> */}
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="dark" fullWidth>
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
        </form>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
