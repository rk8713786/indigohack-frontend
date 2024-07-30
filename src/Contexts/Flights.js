import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";
import amadeus from "../api/amadeus";
import { auth } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getDoc,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";

const FlightContext = createContext({
  finder: () => Promise,
});

export function useFlight() {
  return useContext(FlightContext);
}

export function FlightProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [passengers, setPassengers] = useState([]);
  const [newArray, setNewArray] = useState({});
  var bookingDetails = [];

  const [loaded, setLoaded] = useState(true);
  const [airline, setAirline] = useState(null);
  const [msgData, setMsgData] = useState([]);
  var random = Math.floor(Math.random() * 10 + 1);

  const [info, setInfo] = useState(null);

  const [paymentDone, setPaymentDone] = useState(null);

  const [avlbls, setAvlbls] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || null;
  });
  const [success, setSuccess] = useState(false);

  async function logOut() {
    return await signOut(auth).then(() => {
      setCurrentUser(null);
    });
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(email, password, birthday, name, phone, gender) {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (cred) => {
        const docRef = doc(db, "users", cred.user.uid);
        const docSnap = getDoc(docRef);
        if (!docSnap.exists) {
          setDoc(doc(db, "users", cred.user.uid), {
            uid: cred.user.uid,
            gender: gender,
            email: cred.user.email,
            displayName: name,
            photoURL: cred.user.photoURL,
            birthday: birthday,
            phone: phone,
          });
        }
      },
      function (error) {
        alert(error);
      }
    );
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider).then((cred) => {
      console.log(cred.user.uid);
      const docRef = doc(db, "users", cred.user.uid);
      const docSnap = getDoc(docRef);
      if (!docSnap.exists) {
        setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          gender: "",
          email: cred.user.email,
          displayName: cred.user.displayName,
          photoURL: cred.user.photoURL,
          birthday: "",
          phone: "",
        });
      }
    });
  }

  const [index, setIndex] = useState(null);
  const [keyIndex, setKeyIndex] = useState(null);
  const [find, setFind] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  async function getAirline(tag) {
    await amadeus.referenceData.airlines
      .get({
        airlineCodes: avlbls[tag].validatingAirlineCodes[0],
      })
      .then(
        (data) => {
          setAirline(data.data[0].businessName);
        },
        function (error) {
          alert(error);
        }
      );
  }

  async function flightSearch(details) {
    try {
      if (info === null) {
        setInfo(details);
      }
      localStorage.setItem("info", JSON.stringify(info));
      await amadeus.shopping.flightOffersSearch
        .get({
          originLocationCode: details.Origin,
          destinationLocationCode: details.Destination,
          departureDate: details.departDate,
          returnDate: details.returnDate,
          adults: details.traveller.adult,
          children: details.traveller.child,
          infants: details.traveller.infant,
          travelClass: details.class,
          currencyCode: "INR",
        })
        .then(
          function (doc) {
            console.log(doc.data);
            if (avlbls === null) {
              setAvlbls(doc.data);
            }
          },
          function (error) {
            alert(error);
          }
        );
    } catch {}
  }
  async function finder() {
    window.localStorage.clear();
    return await amadeus.referenceData.locations
      .get({
        keyword: find,
        subType: "AIRPORT",
      })
      .then(
        (response) => {
          setSuggestions(response.data);
        },
        function (error) {
          console.log(error);
        }
      );
  }

  const clickHandle = (e) => {
    let tag = e.currentTarget.dataset.tag;
    console.log(tag);
    setIndex(tag);
    getAirline(tag);
  };
  const handleClick = (tag) => {
    console.log(tag);
    setKeyIndex(tag);
  };
  async function uploadImage(img) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${img.name}`);

    await uploadBytes(storageRef, img).then((snapshot) => {
      console.log("Uploaded");
      updateImage(img);
    });
  }

  async function updateImage(img) {
    const storage = getStorage();
    console.log("hello");
    await getDownloadURL(ref(storage, `images/${img.name}`)).then((url) => {
      console.log(url);
      const docRef = doc(db, "users", currentUser.uid);
      updateDoc(docRef, {
        photoURL: url,
      }).then(() => {
        setSuccess(true);
        if (currentUser === url) {
          window.location.reload();
        }
      });
    });
  }

  function readData(user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = getDoc(docRef);
    if (user) {
      docSnap.then((doc) => {
        localStorage.setItem("user", JSON.stringify(doc.data()));
        let obj = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(obj);
        setLoaded(false);
      });
    }
  }

  async function getBooked() {
    const docRef = doc(db, "users", currentUser.uid);
    var pass = [];
    pass.push(
      { tCount: info.traveller },
      { passengerDetails: passengers },
      { avlblDetails: avlbls[index] },
      { airlineName: airline },
      { seat: random }
    );
    console.log(pass);
    const newPass = { ...pass };

    await updateDoc(docRef, {
      MyBookings: arrayUnion(newPass),
    });
    console.log(bookingDetails);
  }

  async function getCancelled(i) {
    const docRef = doc(db, "users", currentUser.uid);
    const varr = { ...currentUser.MyBookings[i] };

    await updateDoc(docRef, {
      MyBookings: arrayRemove(varr),
    });
  }

  // async function fetchNotifications() {
  //   const notificationsRef = collection(db, "Notifications");
  //   const snapshot = await getDocs(notificationsRef);
  //   const notifications = snapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   // Process each notification
  //   for (const notification of notifications) {
  //     // Check if status is 'done'; skip if it is
  //     if (notification.status === "done") {
  //       console.log(
  //         `Notification ${notification.id} has already been processed.`
  //       );
  //       continue;
  //     }

  //     try {
  //       // Trigger the appropriate notification based on the method field
  //       if (notification.method === "SMS") {
  //         await sendSMSNotification(notification);
  //       } else if (notification.method === "mail") {
  //         await sendEmailNotification(notification);
  //       }

  //       // Add status field as 'done' after sending
        
  //     } catch (error) {
  //       console.error("Error processing notification:", error);
  //     }
  //   }

  //   // Optionally set notifications to state
  //   localStorage.setItem("notifications", JSON.stringify(notifications));
  //   let obj = JSON.parse(localStorage.getItem("notifications"));
  //   setMsgData(obj);
  //   setLoaded(false);
  // }

  // async function sendEmailNotification(notification) {
  //   try {
  //     await axios.post("http://localhost:3001/send-email", notification);
  //     await addNotificationStatus(notification.id, "done");
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //   }
  // }

  // async function sendSMSNotification(notification) {
  //   try {
  //     await axios.post("http://localhost:3001/send-sms", notification);
  //     await addNotificationStatus(notification.id, "done");
  //   } catch (error) {
  //     console.error("Error sending SMS:", error);
  //   }
  // }

  // async function addNotificationStatus(notificationId, status) {
  //   const notificationRef = doc(db, "Notifications", notificationId);
  //   try {
  //     await updateDoc(notificationRef, { status });
      
  //   } catch (error) {
  //     console.error("Error adding notification status:", error);
  //   }
  // }

  async function fetchNotifications() {
    const notificationsRef = collection(db, "Notifications");
    const snapshot = await getDocs(notificationsRef);
    const notifications = snapshot.docs.map(doc => doc.data());

    if (notifications) {
    {
        localStorage.setItem("notifications", JSON.stringify(notifications));
        let obj = JSON.parse(localStorage.getItem("notifications"));
        setMsgData(obj);
        setLoaded(false);
      };
    }
    // You can also set these notifications to state if needed
    // setNotifications(notifications);

  
    sendEmailNotification(notifications)
    sendSMSNotification(notifications)

  }

  async function sendEmailNotification(msgData) {
    try {
      const response = await axios.post('http://localhost:3001/send-email', msgData);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  
  // Send SMS
  async function sendSMSNotification(msgData) {
    try {
      const response = await axios.post('http://localhost:3001/send-sms', msgData);
      console.log(msgData)
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }


  useEffect(() => {
    localStorage.setItem("index", JSON.stringify(index));
    window.localStorage.setItem("avlbls", JSON.stringify(avlbls));
    localStorage.setItem("info", JSON.stringify(info));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        readData(user);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [info, avlbls, index]);

  const value = {
    flightSearch,
    setInfo,
    info,
    msgData,
    avlbls,
    find,
    setFind,
    suggestions,
    setSuggestions,
    finder,
    clickHandle,
    signInWithGoogle,
    signIn,
    signUp,
    logOut,
    currentUser,
    uploadImage,
    updateImage,
    success,
    getAirline,
    index,
    airline,
    passengers,
    setPassengers,
    getBooked,
    handleClick,
    keyIndex,
    getCancelled,
    newArray,
    setNewArray,
    random,
    paymentDone,
    setPaymentDone,
    fetchNotifications, // Add the new function here
  };

  return (
    <FlightContext.Provider value={value}>
      {currentUser ? !loaded && !loading && children : !loading && children}
    </FlightContext.Provider>
  );
}

