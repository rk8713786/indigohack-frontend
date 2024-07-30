import React from "react";
import "../pages/css/FlightList.css";

function TicketCard(props) {
  return (
    <div className="component-fflight-card mb-3 shadow rounded mt-5  ">
      <div className="bg-danger text-white card-header  ">
        <tr className="row">
          <td className="ml-5 col-md-3">Boarding Pass</td>
          <td className="col-md-3">{props.airLine}</td>
          <td className="col-md-2">{props.cabin}</td>
          <td className="vertical"></td>
          <td className="col">Boarding Pass</td>
          <td className="col">{props.airLine}</td>
          <td className="col">{props.cabin}</td>
        </tr>
      </div>
      <div></div>

      <tr className="row m-0 w-100">
        <td className="col-md-3">
          Passenger Name
          <h6 className="flight-card-flength mb-1">{props.name}</h6>
        </td>

        <td className="col-md-3">
          Date
          <p className="flight-card-flength mb-1">{props.date}</p>
        </td>
        <td className="col-md-2 ">
          Time
          <p className="flight-card-flength mb-1">{props.time}</p>
        </td>
        <td className="col">
          Passenger Name
          <p className="flight-card-flength mb-1">{props.name}</p>
        </td>
      </tr>

      <tr className="row m-0 w-100">
        <td className="col-md-3">
          From
          <p className="flight-card-flength mb-1">{props.origin}</p>
        </td>

        <td className="col-md-3">
          Flight
          <p className="flight-card-flength mb-1">{props.flightNo}</p>
        </td>
        <td className="col-md-2">
          Seat
          <p className="flight-card-flength mb-1">{props.seat}</p>
        </td>
        <td className="col">
          From
          <p className="flight-card-flength mb-1">{props.origin}</p>
        </td>
      </tr>
      <tr className="row m-0 w-100">
        <td className="col-md-3">
          To
          <p className="flight-card-flength mb-1">{props.destination}</p>
        </td>

        <td className="col-md-3">
          Gate
          <p className="flight-card-flength mb-1">{props.gateNo}</p>
        </td>
        <td className="col-md-2">
          Board Till
          <p className="flight-card-flength mb-1">{props.boardingTime}</p>
        </td>
        <td className="col">
          To
          <p className="flight-card-flength mb-1">{props.destination}</p>
        </td>
      </tr>
      <tr className="row m-0 w-100">
        <td className="col-md-8"></td>
        <td className="col">
          Date
          <p className="flight-card-flength mb-1">{props.date}</p>
        </td>
        <td className="col">
          Time
          <p className="flight-card-flength mb-1">{props.time}</p>
        </td>
        <td className="col">
          Flight
          <p className="flight-card-flength mb-1">{props.flightNo}</p>
        </td>
      </tr>
      <tr className="row m-0 w-100">
        <td className="col-md-8"></td>
        <td className="col">
          Seat
          <p className="flight-card-flength mb-1">{props.seat}</p>
        </td>
        <td className="col">
          Gate
          <p className="flight-card-flength mb-1">{props.gateNo}</p>
        </td>
        <td className="col"></td>
      </tr>

      <div className="bg-danger text-white card-header  "></div>
    </div>
  );
}

export default TicketCard;
