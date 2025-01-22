import React, { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/vehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitingDriver from "../components/WaitingDriver";
import axios from "axios";
import { SocketClientContext } from "../context/SocketContext";
import { UserDataContext } from "../context/userContext";

const updateMapImage =
  "https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif";

const Home = () => {
  const suggestionsPanel = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const waitingPanelRef = useRef(null);

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [clickedField, setClickedField] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [openVehiclePanel, setOpenVehiclePanel] = useState(false);
  const [openConfirmRidePanel, setOpenConfirmRidePanel] = useState(false);
  const [openWaitingDriverPanel, setOpenWaitingDriverPanel] = useState(false);
  const [fare, setFare] = useState({});
  const [start_location, setStart_location] = useState({});
  const [end_location, setEnd_location] = useState({});
  const [clickedVehicle, setClickedVehicle] = useState({});
  const [waitingRideData, setWaitingRideData] = useState({});

  //socket
  const { socket } = useContext(SocketClientContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { dataId: user._id, dataType: "user" });
  }, [user]);

  const pickupSuggestionsHandler = async (e) => {
    const value = e.target.value;
    console.log(value);
    if (value !== pickup) {
      setPickup(value);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPickupSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching pickup suggestions:", error);
      }
    }
  };

  const dropSuggestionsHandler = async (e) => {
    const value = e.target.value;
    if (value !== drop) {
      setDrop(value);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDropSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching drop suggestions:", error);
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Pickup:", pickup, "Drop:", drop);
  };

  useEffect(() => {
    gsap.to(suggestionsPanel.current, {
      height: openPanel ? "80%" : "0%",
    });
  }, [openPanel]);

  useEffect(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: openVehiclePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [openVehiclePanel]);

  useEffect(() => {
    gsap.to(confirmRideRef.current, {
      transform: openConfirmRidePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [openConfirmRidePanel]);

  useEffect(() => {
    gsap.to(waitingPanelRef.current, {
      transform: openWaitingDriverPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [openWaitingDriverPanel]);

  const findTrip = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride/get-fare`,
        {
          params: {
            origin: pickup,
            destination: drop,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const fare = response.data;
      console.log(fare);
      setFare(fare);
      setStart_location(fare.start_location);
      setEnd_location(fare.end_location);
    } catch (err) {
      console.log(err.message, " Home line 108");
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/create`,
        {
          pickup,
          destination: drop,
          vehicleType: clickedVehicle.vehicle,
          price: Number(clickedVehicle.price),
          start_location: start_location,
          end_location: end_location,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setWaitingRideData(response.data);
    } catch (err) {
      console.log(err.message, " Home line 134");
    }
  };

  useEffect(() => {
    if (waitingRideData) {
      console.log(waitingRideData);
    }
  }, [waitingRideData]);


  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div
        onClick={() => {
          if (openPanel || openVehiclePanel) {
            setOpenPanel(false);
            setOpenVehiclePanel(false);
          }
        }}
        className="w-screen h-screen"
      >
        <img
          className="pt-48 border-5 cursor-pointer"
          src={
            openWaitingDriverPanel
              ? updateMapImage
              : `https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif`
          }
          alt="map-image"
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            className={`absolute right-9 text-3xl font-bold ${
              openPanel ? "" : "hidden"
            }`}
          >
            <i
              onClick={() => setOpenPanel(false)}
              className="ri-arrow-down-wide-fill"
            ></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                if (!openPanel) setOpenPanel(true);
                setClickedField("pickup");
              }}
              onChange={pickupSuggestionsHandler}
              value={pickup}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                if (!openPanel) setOpenPanel(true);
                setClickedField("drop");
              }}
              onChange={dropSuggestionsHandler}
              value={drop}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={() => {
              if (!openPanel) setOpenPanel(true);
              if (!openVehiclePanel) setOpenVehiclePanel(true);
              findTrip();
            }}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>

        <div ref={suggestionsPanel} className="h-0 bg-white">
          <LocationSearchPanel
            suggestions={
              clickedField === "pickup" ? pickupSuggestions : dropSuggestions
            }
            clickedField={clickedField}
            setOpenVehiclePanel={setOpenVehiclePanel}
            setOpenPanel={setOpenPanel}
            setDrop={setDrop}
            setPickup={setPickup}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          setClickedVehicle={setClickedVehicle}
          fare={fare}
          setOpenVehiclePanel={setOpenVehiclePanel}
          setOpenPanel={setOpenPanel}
          setOpenConfirmRidePanel={setOpenConfirmRidePanel}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-3"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          drop={drop}
          clickedVehicle={clickedVehicle}
          setOpenPanel={setOpenPanel}
          setOpenVehiclePanel={setOpenVehiclePanel}
          setOpenConfirmRidePanel={setOpenConfirmRidePanel}
          setOpenWaitingDriverPanel={setOpenWaitingDriverPanel}
        />
      </div>

      <div
        ref={waitingPanelRef}
        className="fixed w-full border z-10 bottom-0 bg-white px-3 py-6 pt-20"
      >
        <WaitingDriver

          waitingRideData={waitingRideData}
          setOpenWaitingDriverPanel={setOpenWaitingDriverPanel}
          setOpenConfirmRidePanel={setOpenConfirmRidePanel}
        />
      </div>
    </div>
  );
};

export default Home;
