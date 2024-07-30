import React from 'react'
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";

function Cancelled() {
    const history = useHistory();
    return (
        <div className="main-flist mt-5">
        <div className="display-4 text-primary text-center mt-5 pt-5">
            <h2>Your Tickets Are Cancelled</h2>
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
    )
}

export default Cancelled
