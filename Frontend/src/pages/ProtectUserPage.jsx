import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
const token = localStorage.getItem("token");
import axios from "axios";
const ProtectUserPage = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  const driverToken = localStorage.getItem("driverToken");

  useEffect(() => {

    const checkToken = async () => {
      await axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          navigate("/user-home");
        })
        .catch((err) => {
          //console.log(err);
          navigate("/user-login");
        });
    };

    checkToken();

  }, [token]);

  return <div>{children}</div>;
};

export default ProtectUserPage;
