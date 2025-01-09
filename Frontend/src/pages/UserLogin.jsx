//import React from 'react';
import { useState,  useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
const UserLogin = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };
 console.log(import.meta.env.VITE_BASE_URL)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        newUser
      );
      const data = response.data.user;

      await setUser({
        email: data.email,
        fullName: {
          fName: data.fullName.fName,
          lName: data.fullName.lName,
        },
      });
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }

    // console.log(userData);
    //setEmail('');
    //setPassword('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <img
          className="w-16 mb-2 "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaI0-AaIAcwVCkcnR8xdetso-wz9rCOVJB5Q&s"
          alt=""
        />
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-xl font-medium mb-2"> Whats Your Email </h3>

          <input
            className="bg-[#eeeeee] rounded  mb-7 py-2 px-4 border w-full text-lg placeholder:text-base "
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email@example.com"
            required
          />

          <h3 className="text-xl  font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] rounded
             mb-7 py-2 px-4 border w-full text-lg placeholder:text-base "
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            required
          />

          <button
            className="bg-[#111]
            text-white font-semibold rounded-lg
             mb-7 py-2 px-4 border w-full text-lg placeholder:text-base"
          >
            Login
          </button>

          <Link to="/user-signup" className=" text-black-600 text-center">
            New Here?{" "}
            <span className="mb-2 underline text-blue-700">
              Create An Account
            </span>{" "}
          </Link>
        </form>
      </div>
      <div>
        <Link to="/driver-login">
          <button
            className="bg-green-500
            text-white font-semibold rounded-lg
             mb-7 py-2 px-4 border w-full text-lg placeholder:text-base"
          >
            Sign in Driver
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
