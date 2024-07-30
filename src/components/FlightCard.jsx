import React from "react";

function FlightCard(props) {
  return (
    <div className="component-flight-card mb-3 shadow rounded">
      <div className="row m-0 w-100">
        <div className="col">
          <h6 className="flight-card-time mb-1">
            {props.depart} - {props.arrive}
          </h6>
        </div>

        <div className="col">
          <p className="flight-card-length mb-1">
            {props.length} ({props.stops})
          </p>
        </div>
      </div>

      <div className="row m-0 w-100">
        <div className="col">
          <p className="flight-card-company">{props.company}</p>
        </div>
      </div>

      <h5 className="flight-card-price">&#8377; {props.price}</h5>
    </div>
  );
}

export default FlightCard;
