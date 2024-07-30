import React from "react";

function SelectedCard(props) {
  console.log(props.stops);

  return (
    <div className="component-flight-card mb-3 w-100 shadow rounded">
      <div className="row m-0 w-100">
        <div className="col">
          <p className="flight-card-company">
            <h5>{props.company}</h5>
          </p>
        </div>
      </div>
      <div className="row mb-3 mt-3">
        <div className="col">
          <h6 className="flight-card-slength mb-1">{props.depart}</h6>
        </div>
        <div className="col">
          <h6 className="flight-card-slength mb-1">
            - {props.stops > 0 ? props.via : null} -
          </h6>
        </div>
        <div className="col">
          <h6 className="flight-card-slength mb-1">{props.arrive}</h6>
        </div>
      </div>
      <div className="row  mb-3 mt-3">
        <div className="col">
          <h6 className="flight-card-slength mb-1">{props.dTime}</h6>
        </div>
        <div className="col">
          <h6 className="flight-card-slength mb-1">{props.length}</h6>
        </div>
        <div className="col ">
          <h6 className="flight-card-slength mb-1">{props.aTime}</h6>
        </div>
      </div>
      <div className="row mb-3 mt-3">
        <div className="col">
          <h6 className="flight-card-slength mb-1">{props.dDate}</h6>
        </div>
        <div className="col "></div>
        <div className="col">
          <h6 className="flight-card-slength mb-1">{props.aDate}</h6>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col "></div>
        <div className="col-md-2">
          <h5 className=""> &#8377; {props.price}</h5>
        </div>
      </div>
    </div>
  );
}
export default SelectedCard;