import React from "react";
import { useFlight } from "../Contexts/Flights";
import BookingCard from "../components/BookingCard";
import "./css/FlightList.css";

function FlightCheckin(props) {
  const { currentUser } = useFlight();

  return (
    <div className="component-filght-list">
      <div className="main-slist mt-3">
        <div className="flight-list-header rounded">
          <h2 className="display-4 text-primary text-center mt-5">
            My Bookings
          </h2>
          
          {currentUser.MyBookings.map((MyBooking, key) => (
         
            <div key={key} data-tag={key}>
              <BookingCard
                airLine={MyBooking[0].airlineName}
                nData={key}
                cabin={"ECO"}
                name={MyBooking[1].passengerDetails[0].tName}
                date={MyBooking[2].avlblDetails.itineraries[0].segments[0].departure.at.substring(
                  0,
                  10
                )}
                time={MyBooking[2].avlblDetails.itineraries[0].segments[0].departure.at.substring(
                  11,
                  16
                )}
                origin={
                  MyBooking[2].avlblDetails.itineraries[0].segments[0].departure.iataCode
                }
                flightNo={
                  MyBooking[2].avlblDetails.itineraries[0].segments[0].number +
                  MyBooking[2].avlblDetails.validatingAirlineCodes[0]
                }
                destination={
                  MyBooking[2].avlblDetails.itineraries[0].segments[
                    MyBooking[2].avlblDetails.itineraries[0].segments.length - 1
                  ].arrival.iataCode
                }
                aTime={MyBooking[2].avlblDetails.itineraries[0].segments[
                  MyBooking[2].avlblDetails.itineraries[0].segments.length - 1
                ].arrival.at.substring(11, 16)}
                aDate={MyBooking[2].avlblDetails.itineraries[0].segments[
                  MyBooking[2].avlblDetails.itineraries[0].segments.length - 1
                ].arrival.at.substring(0, 10)}
                price={MyBooking[2].avlblDetails.price.base}
              />
            </div> 
          ))}
        </div>
      </div>
    </div>
  );
}
export default FlightCheckin;
