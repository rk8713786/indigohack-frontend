import React, { useEffect } from "react";
import { useFlight } from "../Contexts/Flights";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
const PayByRazorPay = () => {
  const history = useHistory();
  const { avlbls, index, currentUser, setPaymentDone, getBooked } = useFlight();
  const options = {
    key: "rzp_test_Q4EBPUg6avMGmy",
    amount: avlbls[index].price.base * 100, //  = INR 1
    name: "Airway Moment",
    description: "Complete the payment to Book flight",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      setPaymentDone(response.razorpay_payment_id);
      alert(response.razorpay_payment_id);
      getBooked();
      history.push("/Booked");
    },
    prefill: {
      name: currentUser.displayName,
      contact: currentUser.phone,
      email: currentUser.email,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Button variant="primary" onClick={openPayModal}>
        Confirm & Pay
      </Button>
    </>
  );
};

export default PayByRazorPay;
