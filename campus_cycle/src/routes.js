// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Donation from"layouts/donation";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";

import Discussion from "layouts/discussion";
import Market from "layouts/market";
import MyProducts from "layouts/myProducts";
import MyOrders from "layouts/myOrders";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ProductDetails from "layouts/market/components/productDetails";
import AuctionProductDetails from "layouts/market/components/AuctionProductDetails";
import ProductForm from "layouts/market/components/productForm";
import Chat from "layouts/chats/Chat";
import PrivateChat from "layouts/chats/PrivateChat";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Chats from "layouts/chats";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import Diversity2Icon from '@mui/icons-material/Diversity2';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DonationCardDetails from "layouts/donation/donationCardDetails";
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';


const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "dashboard",
    route: "/dashboard",
    icon: <HomeRoundedIcon size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Discussion",
    key: "discussion",
    route: "/discussion",
    icon: <Diversity2Icon size="12px" />,
    component: <Discussion/>,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Chats",
    key: "chats",
    route: "/chats",
    icon: <InboxRoundedIcon size="12px" />,
    component: <Chats/>,
    noCollapse: true,
  },

  {
    type: "chat",
    name: "Chats",
    key: "chats",
    route: "/chats/Chat",
    component: <Chat/>,
    noCollapse: true,
  },

  {
    type: "chat",
    name: "PrivateChat",
    key: "PrivateChat",
    route: "/chats/PrivateChat/:helpId/:username",
    component: <PrivateChat/>,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Donation",
    key: "donation",
    route: "/donation",
    icon: <VolunteerActivismIcon size="12px" />,
    component: <Donation />,
    noCollapse: true,
  },
  {
    type: "static_collapse",
    name: "Donation Card Details",
    key: "donation_detail",
    route: "/donation/card/:cardId",
    icon: <VolunteerActivismIcon size="12px" />,
    component: <DonationCardDetails />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  // },
  // { type: "title", title: "Seller Section", key: "seller-section" },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "static_collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "static_collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "sub_route",
    name: "Product Details",
    key: "product-details",
    route: "/market/product-details/:id",
    // icon: none,
    component: <ProductDetails />,
    noCollapse: true,
  },
  {
    type: "sub_route",
    name: "AuctionProduct Details",
    key: "auctionproduct-details",
    route: "/market/auctionproduct-details/:id",
    // icon: none,
    component: <AuctionProductDetails />,
    noCollapse: true,
  },
  { type: "title", title: "Market Place", key: "market-place" },
  {
    type: "collapse",
    name: "Market",
    key: "market",
    route: "/market",
    icon: <Shop size="12px"/>,
    component: <Market />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Products",
    key: "my-products",
    route: "/my-products",
    icon: <Office size="12px"/>,
    component: <MyProducts />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Orders",
    key: "my-orders",
    route: "/my-orders",
    icon: <CreditCard size="12px"/>,
    component: <MyOrders />,
    noCollapse: true,
  },
  
];

export default routes;
