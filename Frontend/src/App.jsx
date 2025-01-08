//import React from 'react';
//import Home from './components/Home';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import UserSignUp from './pages/UserSignUp';
import UserLogin from './pages/userLogin';
import DriverSignUp from './pages/DriverSignUp';
import DriverLogin from './pages/DriverLogin';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/user-signup' element={<UserSignUp/>} />
      <Route path='/user-login' element={<UserLogin/>} />
      <Route path='/driver-signup' element={<DriverSignUp/>} />
      <Route path='/driver-login' element={<DriverLogin/>} />      
    </Routes>

  
    </>
  );
};

export default App;