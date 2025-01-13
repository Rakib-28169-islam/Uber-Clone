//import React from 'react';
//import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserSignUp from "./pages/UserSignUp";
import UserLogin from "./pages/userLogin";
import DriverSignUp from "./pages/DriverSignUp";
import DriverLogin from "./pages/DriverLogin";
import Home from "./pages/Home";
import ProtectUserPage from "./pages/ProtectUserPage";
import ProtectDriverPage from "./pages/ProtectDriverPage";
import DriverHome from "./pages/DriverHome";
import DriverRiding from "./pages/DriverRiding";
//import ProtectPage from "./pages/ProtectUserPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/driver-signup" element={<DriverSignUp />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/driver-riding" element={<DriverRiding/>}/>
        <Route
          path="/user-home"
          element={
            <ProtectUserPage>
              <Home />
            </ProtectUserPage>
          }
        />
        <Route
          path="/driver-home"
          element={
            <ProtectDriverPage>
              <DriverHome/>
            </ProtectDriverPage>
          }
        />
      </Routes>
    </>
  );
};

export default App;
