import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default SharedLayout;
