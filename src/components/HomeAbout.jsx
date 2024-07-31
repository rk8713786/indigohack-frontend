import React from "react";

function HomeAbout(props) {
  return (
    <div className="component-home-about">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm order-2 order-md-1">
            <span>
              <h3>We're here to help.</h3>
              Whether you are having trouble with a purchase or need some
              guidance, our customer service representatives are available 24/7.
              We know the struggles and strive to be the best we can be when
              handling your problems!
            </span>
          </div>

          <div className="col-sm order-1 order-md-2">
            <img
              src="https://images.unsplash.com/photo-1543360458-36fada9295c1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Work Team"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <img
              src="https://images.unsplash.com/photo-1698595626973-8e5e8fb462e6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Data World"
            />
          </div>

          <div className="col-sm">
            <span>
              <h3>We connect you.</h3>
              Our databases are jam packed full of information of various
              airports and the flights they are managing. Look no further in
              finding the perfect flight. Just type in your needs, and we will
              give you the flights that suit your preferences.
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-sm order-2 order-md-1">
            <span>
              <h3>We go bigger.</h3>
              We're working hard on our own airline! Please leave us emails with
              inquiries on features you'd like to see, and perhaps some gripes
              with the current world's leading airlines. We always aim to be
              bigger and better than before.
            </span>
          </div>

          <div className="col-sm order-1 order-md-2">
            <img
              src="https://plus.unsplash.com/premium_photo-1682142193421-fb1b1a96fc78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxBaXJsaW5lcyUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Work Team"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAbout;
