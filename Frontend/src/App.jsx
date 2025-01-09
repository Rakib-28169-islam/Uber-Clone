//import React from 'react';
//import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserSignUp from "./pages/UserSignUp";
import UserLogin from "./pages/userLogin";
import DriverSignUp from "./pages/DriverSignUp";
import DriverLogin from "./pages/DriverLogin";
import Home from "./pages/Home";
import ProtectPage from "./pages/ProtectPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/driver-signup" element={<DriverSignUp />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route
          path="/home"
          element={
            <ProtectPage>
              <Home />
            </ProtectPage>
          }
        />
      </Routes>
    </>
  );
};

export default App;
