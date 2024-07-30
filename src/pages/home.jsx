import React from "react";
import HomeTop from "../components/HomeTop";
import HomeAlert from "../components/HomeAlert";
import HomeAbout from "../components/HomeAbout";
import Footer from "../components/Footer";
import "./css/home.css";
function home(props) {
  return (
    <div className="component-home">
      <HomeTop />
      <HomeAlert />
      <HomeAbout />
      <Footer />
    </div>
  );
}

export default home;
