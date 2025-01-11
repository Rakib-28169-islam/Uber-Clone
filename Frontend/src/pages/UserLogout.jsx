import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
const UserLogout = () => {
  //const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const onLogout = async () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message);
          localStorage.removeItem("token");
          setUser(null);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err ,`Error Logging out in userLogout.jsx`);
      });
  };
  return (
    <div>
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default UserLogout;
