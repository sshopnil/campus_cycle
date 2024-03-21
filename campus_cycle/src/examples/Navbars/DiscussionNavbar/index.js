// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// Soft UI Discussion React components
import SoftBox from "components/SoftBox";

// Soft UI Discussion React examples
import Breadcrumbs from "examples/Breadcrumbs";

// Custom styles for DiscussionNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import Topics from "./Topics";




function DiscussionNavbar({ topics}) {
    const route = useLocation().pathname.split("/").slice(1);

  return (
    <AppBar
      position={"absolute"}
      color="inherit"
      sx={{
        marginTop: '100px'
      }}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }}>
          <SoftBox>
            <span style={{color: '#666C8F', fontSize: '20px', textTransform: 'uppercase'}}>Topics  </span>
            <Topics topics={topics}/>
          </SoftBox>
        </SoftBox>
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DiscussionNavbar
DiscussionNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DiscussionNavbar
DiscussionNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DiscussionNavbar;
