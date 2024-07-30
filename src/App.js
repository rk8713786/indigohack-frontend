import React from "react";
import "./pages/css/global.css";
import { BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";
import Home from "./pages/home";
import flightList from "./pages/flightList";
import FlightCheckin from "./pages/flightCheckin";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Profile from "./pages/Profile.jsx";
import PayByRazorPay from "./components/Payment.jsx";
import Booked from "./pages/Booked";
import MyBookings from "./pages/MyBookings";
import Checkin from "./pages/Checkin";
import Cancelled from "./pages/Cancelled";
import About from "./pages/About"
import support from "./pages/support";
import Notifff from "./pages/Notifff.jsx"
import NotificationsComponent from "./components/NotificationsComponent.jsx";

function App() {
  return (
    <div className="App">
      <Router className="mainRouter">
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/flightlist" component={flightList} />
          <Route exact path="/Notifications" component={NotificationsComponent}/>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Payment" component={PayByRazorPay} />
          <Route exact path="/About" component={About} />
          <Route exact path="/support" component={support} />
          <PrivateRoute exact path="/Profile" component={Profile} />
          <PrivateRoute exact path="/flightCheckin" component={FlightCheckin} />
          <PrivateRoute exact path="/Booked" component={Booked} />
          <PrivateRoute exact path="/MyBookings" component={MyBookings} />
          <PrivateRoute exact path="/Checkin" component={Checkin} />
          <PrivateRoute exact path="/Cancelled" component={Cancelled} />
          <Redirect to="/" />

          {/* 
          <PrivateRoute exact path="/ChangePassword" 
          component={ChangePassword} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
