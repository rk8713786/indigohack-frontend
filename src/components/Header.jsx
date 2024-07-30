import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InfoIcon from "@material-ui/icons/Info";
import { Link, useLocation } from "react-router-dom";
import { useFlight } from "../Contexts/Flights";
import Avatar from "@material-ui/core/Avatar";
import "../pages/css/Header.css";

const Header = (props) => {
  const location = useLocation();
  const { currentUser, logOut } = useFlight();

  return (
    <div className="Nav">
      {/* <div className="Logo">
        <img src="./images/Folleague-Logo.svg" alt="Folleague" />
      </div> */}
      <div className="NavMenu">
        <a href="/">
          <HomeIcon className="icons" style={{ color: "#1B1464" }} />
          <span>HOME</span>
        </a>
        {/* <a href="/Log">
          <SearchIcon className="icons" style={{ color: "#1B1464" }} />
          <span>SEARCH</span>
        </a> */}
        <a href="/support">
          <ContactSupportIcon className="icons" style={{ color: "#1B1464" }} />
          <span>CUSTOMER SUPPORT</span>
        </a>
        <a href="/About">
          <InfoIcon className="icons" style={{ color: "#1B1464" }} />
          <span>ABOUT US</span>
        </a>
      </div>

      {location.pathname === "/Login" ? null : currentUser ? (
        <div className="UserName">
          <span className="namee">
          {currentUser.displayName}
          </span>
        <div className="SignOut D">
          
          <div className="">
          
            {currentUser.photoURL ? (
              <Avatar
                src={currentUser.photoURL}
                style={{ height: "100%", width: "100%", borderRadius: "50%" }}
                alt="Photo"
              />
            ) : (
              <AccountCircle
                className="Dvisible"
                style={{ fontSize: 55, color: "#1B1464" }}
              />
            )}
          </div>

          <div className="Dropdown Dvisible">
            {location.pathname === "/Profile" ? null : (
              <div className="">
                <Link
                  to="/Profile"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span>My Profile</span>
                </Link>

                <div>
                  <hr
                    style={{
                      color: "#FFA900",
                      backgroundColor: "white",
                      height: 0.7,
                      borderColor: "#FFA900",
                      borderRadius: "3px",
                    }}
                  />
                </div>
              </div>
            )}
            <span
              onClick={async (e) => {
                e.preventDefault();
                logOut();
                localStorage.clear();

                alert("logout user");
              }}
            >
              Sign out
            </span>
          </div>
        </div>
        </div>
      ) : (
        <Link to="/Login" style={{ textDecoration: "none" }}>
          <div className="Login">Login</div>
        </Link>
      )}
    </div>
  );
};
export default Header;
