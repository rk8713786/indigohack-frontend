import React from "react";
import { Avatar, Container, Badge } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { useFlight } from "../Contexts/Flights";
import FileUpload from "../components/FileUpload";
import Flash from "../components/Flash";

function Profile() {
  const { currentUser, success, logOut } = useFlight();

  console.log(currentUser.photoURL);
  return (
    <div className="bg-light ">
      <div>
        <Container>
          {success ? (
            <Flash message="Updated! Refresh To View The Changes" />
          ) : (
            ""
          )}
          <div className="row mt-5">
            <div className="col-md-4 mt-1">
              <div
                className="card text-center sidebar bg-dark text-white"
                style={{ backgroundColor: " #FFA900" }}
              >
                <div className="card-body mt-5">
                  <Badge
                    overlap="circular"
                    className="w-50 h-50 mx-auto "
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={<FileUpload size="large" />}
                  >
                    <Avatar
                      src={currentUser.photoURL}
                      variant="circular"
                      className="w-100 h-50 mx-auto "
                    />
                  </Badge>
                  <div>
                    <VerifiedUserIcon
                      fontSize="large"
                      style={{ color: "lightgreen" }}
                      className="mt-4"
                    />
                  </div>
                  <div className="mt-5 mb-3">
                    <h2 className="mb-4">{currentUser.displayName}</h2>
                    <a
                      className="ml-10 text-white pb-4 d-block "
                      href="/MyBookings"
                    >
                      My Bookings
                    </a>

                    {/* <a
                      className="ml-10 text-white pb-4 d-block "
                      href="ChangePassword"
                    >
                      Change Password
                    </a> */}
                    <div
                      className="ml-10 text-white pb-4 d-block "
                      onClick={logOut}
                      style={{ cursor: "pointer" }}
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 mt-1">
              <div className="card mb-3 content">
                <h1 className="m-3 pt-3">Personal Details</h1>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Full Name</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {currentUser.displayName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Gender</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {currentUser.gender}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Date Of Birth</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {currentUser.birthday}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Email</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {currentUser.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Phone</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {currentUser.phone}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Profile;
