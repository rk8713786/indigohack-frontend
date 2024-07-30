import React from "react";
import Flash from "../components/Flash";
import TicketCard from "../components/TicketCard";
import { useFlight } from "../Contexts/Flights";
import { Button } from "react-bootstrap";
import "./css/FlightList.css";
import { useHistory } from "react-router-dom";

const Booked = React.forwardRef((props, ref) => {
  const { passengers, info, airline, avlbls, index, random } = useFlight();
  const history = useHistory();
  function printReceipt() {
    window.print();
  }

  return (
    <div ref={ref} className="component-filght-list ">
      <div className="main-flist mt-5">
        <Flash message="Tickets Booked ! Here is Your Tickets" />
        <h2 className="display-4 text-primary text-center mt-5">
          Here Is Your Tickets
        </h2>

        <Button className="w-100 mt-5" type="submit" onClick={printReceipt}>
          Print
        </Button>

        {passengers.map((passenger, key) => (
          <div key={key}>
            <TicketCard
              airLine={airline}
              cabin={info.class}
              name={passenger.tName}
              date={avlbls[
                index
              ].itineraries[0].segments[0].departure.at.substring(0, 10)}
              time={avlbls[
                index
              ].itineraries[0].segments[0].departure.at.substring(11, 16)}
              origin={info.Origin}
              flightNo={
                avlbls[index].itineraries[0].segments[0].number +
                avlbls[index].validatingAirlineCodes[0]
              }
              seat={random + key}
              destination={info.Destination}
              boardingTime="10:30"
              gateNo={
                avlbls[index].itineraries[0].segments[0].departure.terminal
              }
            />
          </div>
        ))}
        <Button
          className="w-100 mt-5"
          type="submit"
          onClick={() => {
            history.push("/MyBookings");
          }}
        >
          View In Booked Flights
        </Button>
      </div>
    </div>
  );
});
export default Booked;
