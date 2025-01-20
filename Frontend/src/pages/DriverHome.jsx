import { useState, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useRef } from "react";
import DriverDashBoard from "../components/DriverDashBoard";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { DriverDataContext } from "../context/DriverContext";
import { SocketClientContext } from "../context/SocketContext";
//import { DriverDataContext } from '../context/DriverContext';

const DriverHome = () => {
  //ref
  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);

  //useState
  const [openRidePopup, setOpenRidePopup] = useState(false);
  const [openConfirmRidePopup, setOpenConfirmRidePopup] = useState(false);
  const [rideData, setRideData] = useState({});

  //context api
  const { socket } = useContext(SocketClientContext);
  const { driverData } = useContext(DriverDataContext);

  //track live location for driver
  useEffect(() => {
    socket.emit("join", { dataId: driverData._id, dataType: "driver" });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-driver", {
            driverId: driverData._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    // return () => clearInterval(locationInterval)
  }, [driverData]);

  //socket
  socket.on("new-ride", async (data) => {
    setRideData(data);
    console.log("new-ride socket on driver home");

     setOpenRidePopup(true);

    //console.log(rideData);
  });

  useEffect(() => {
    if (rideData) {
      console.log("Updated ride data:", rideData);
      // Perform any additional actions based on the updated ride data
    }
  }, [rideData]);

  //useEffect
  useEffect(() => {
    if (openRidePopup) {
      gsap.to(ridePopupRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopupRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [openRidePopup]);

  useEffect(() => {
    if (openConfirmRidePopup) {
      gsap.to(confirmRidePopupRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopupRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [openConfirmRidePopup]);

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/driver-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <DriverDashBoard />
      </div>
      <div
        ref={ridePopupRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          rideData={rideData}
          setOpenRidePopup={setOpenRidePopup}
          setOpenConfirmRidePopup={setOpenConfirmRidePopup}
        />
      </div>
      <div
        ref={confirmRidePopupRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          setOpenRidePopup={setOpenRidePopup}
          setOpenConfirmRidePopup={setOpenConfirmRidePopup}
        />
      </div>
    </div>
  );
};

export default DriverHome;
