import React from "react";
import FlightCard from "../components/FlightCard";
import { useHistory } from "react-router-dom";
import "./css/FlightList.css";
import { useFlight } from "../Contexts/Flights";

function FlightList(props) {
  const { info, avlbls, clickHandle, currentUser } = useFlight();
  const history = useHistory();

  function getStops(a) {
    if (a > 1) {
      return a + " Stops";
    } else {
      return "Nonstop";
    }
  }

  return (
    <div className="component-flight-list">
      <div className="main-list mt-5">
        <div className="flight-list-header rounded">
          <h2>Flight List</h2>

          <hr className="border-secondary" />

          <p>
            <strong>Departing From: </strong>
            {info.Airport.Origin} AIRPORT
            <br />
            <strong>Arriving At: </strong>
            {info.Airport.Destination} AIRPORT
          </p>
        </div>

        <hr className="border-secondary" />

        <div className="row">
          <div className="col-md-12">
            {avlbls.map((avlbl, i) => (
              <div
                key={i}
                value={avlbl}
                onClick={(e) => {
                  if (currentUser) {
                    clickHandle(e);
                    history.push("/flightcheckin");
                  } else {
                    alert("Please Login To Continue ");
                  }
                }}
                data-tag={i}
              >
                <FlightCard
                  depart={avlbl.itineraries[0].segments[0].departure.at.substring(
                    11,
                    16
                  )}
                  arrive={avlbl.itineraries[0].segments[
                    avlbl.itineraries[0].segments.length - 1
                  ].arrival.at.substring(11, 16)}
                  length={avlbl.itineraries[0].duration.substring(2, 8)}
                  stops={getStops(avlbl.itineraries[0].segments.length)}
                  company={"Airline Code :  " + avlbl.validatingAirlineCodes[0]}
                  price={avlbl.price.base}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightList;
