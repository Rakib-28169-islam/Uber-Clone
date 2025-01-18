import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
import axios from "axios";
import { DriverDataContext } from "../context/DriverContext";


const ProtectDriverPage = ({ children }) => {
  const navigate = useNavigate();
  const { driverData,setDriverData } = useContext(DriverDataContext);
  const token = localStorage.getItem("token");
 

  useEffect(() => {

    const checkToken = async () => {
      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/drivers/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDriverData(res.data);
          navigate("/driver-home");
        })
        .catch((err) => {
          console.log(err);
          navigate("/driver-login");
        });
    };

    checkToken();

  }, [token]);

  return <div>{children}</div>;
};

export default ProtectDriverPage;
