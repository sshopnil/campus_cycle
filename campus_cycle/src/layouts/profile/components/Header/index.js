import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageUploadDialog from "../image_upload_dialogue"; // Import the ImageUploadDialog component

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import defaultUserImage from "../../data/place_holder.jpg";
import curvedImage from "assets/images/curved-images/curved0.jpg";
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [openImageUpload, setOpenImageUpload] = useState(false); // State to control the modal

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);

    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = localStorage.getItem("user");
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setUserImageUrl(response.data.imageUrl);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const handleImageUpload = () => {
    setOpenImageUpload(true); // Open the modal when the user clicks the Add icon
  };

  const handleCloseImageUpload = () => {
    setOpenImageUpload(false); // Close the modal when the user closes the ImageUpload component
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: "saturate(200%) blur(30px)",
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Tooltip title="Change Photo" placement="top">
              <IconButton onClick={handleImageUpload} size="small" sx={{ position: "relative" }}>
                <SoftAvatar
                  src={userImageUrl || defaultUserImage}
                  alt="profile-image"
                  variant="rounded"
                  size="xl"
                  shadow="sm"
                />
                <AddCircleSharpIcon
                  color="success"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {userName}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                CEO / Co-Founder
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="App" icon={<Cube />} />
                <Tab label="Message" icon={<Document />} />
                <Tab label="Settings" icon={<Settings />} />
                <Link to={"/authentication/sign-in"}>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      borderColor: "#ba165b",
                      color: "#ba165b",
                      "&:hover": {
                        backgroundColor: "#ba165b",
                        borderColor: "#ba165b",
                        color: "#fff",
                      },
                    }}
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    Log out
                  </Button>
                </Link>
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
      {/* Modal for Image Upload */}
      <ImageUploadDialog
        open={openImageUpload}
        onClose={handleCloseImageUpload}
        setUserImageUrl={setUserImageUrl}
      />
    </SoftBox>
  );
}

export default Header;
