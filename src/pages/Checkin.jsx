import React from "react";
import TicketCard from "../components/TicketCard";
import { useFlight } from "../Contexts/Flights";
import { Button } from "react-bootstrap";
import "./css/FlightList.css";
import { useHistory } from "react-router-dom";

const Checkin = React.forwardRef((props, ref) => {
  const { currentUser, keyIndex, setNewArray } = useFlight();

  console.log(keyIndex);
  var array = currentUser.MyBookings[keyIndex];
  setNewArray(array);
  console.log(array[2].avlblDetails.travelerPricings[0].fareDetailsBySegment[0].cabin);
  const history = useHistory();
  function printReceipt() {
    window.print();
  }

  return (
    <div ref={ref} className="component-filght-list ">
      <div className="main-flist mt-5">
        <h1 className="display-4 text-primary text-center mt-5">
          Here Is Your Tickets
        </h1>

        <Button className="w-100 mt-5" type="submit" onClick={printReceipt}>
          Print
        </Button>

        {array[1].passengerDetails.map((passenger, key) => (
          <div key={key}>
            <TicketCard
              airLine={array[3].airlineName}
              cabin={
                array[2].avlblDetails.travelerPricings[0].fareDetailsBySegment[0].cabin
              }
              name={passenger.tName}
              date={array[2].avlblDetails.itineraries[0].segments[0].departure.at.substring(
                0,
                10
              )}
              time={array[2].avlblDetails.itineraries[0].segments[0].departure.at.substring(
                11,
                16
              )}
              origin={array[2].avlblDetails.itineraries[0].segments[0].departure.iataCode}
              flightNo={
                array[2].avlblDetails.itineraries[0].segments[0].number +
                array[2].avlblDetails.validatingAirlineCodes[0]
              }
              seat={array[4].seat + key}
              destination={
                array[2].avlblDetails.itineraries[0].segments[
                  array[2].avlblDetails.itineraries[0].segments.length - 1
                ].arrival.iataCode
              }
              boardingTime="10:30"
              gateNo={array[2].avlblDetails.itineraries[0].segments[0].departure.terminal}
            />
          </div>
        ))}
        <Button
          className="w-100 mt-5"
          type="submit"
          onClick={() => {
            history.push("/");
          }}
        >
          Search New Flights
        </Button>
      </div>
    </div>
  );
});
export default Checkin;
