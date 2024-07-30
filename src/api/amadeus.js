import Amadeus from "amadeus";

var amadeus = new Amadeus({
  grant_type: "client_credentials",

  
  clientId: process.env.REACT_APP_AMADEUS_CLIENT_ID,
  clientSecret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET,

});

export default amadeus;
