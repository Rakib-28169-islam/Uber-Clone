//import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const DriverLogin = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [driverData,setDriverData] = useState({});
    

    const handleSubmit = async(e)=>{
        e.preventDefault();

        await setDriverData ({
            email:email,
            password:password
        })
        console.log(driverData);
        setEmail('');
        setPassword('');

    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between ">
          <div>
            <img
              className="w-16 mb-2 bg-white "
              src="https://www.svgrepo.com/show/505031/uber-driver.svg"
              alt=""
            />
            <form onSubmit={(e)=>handleSubmit(e)}>
              <h3 className="text-xl font-medium mb-2"> Whats Your Email </h3>
    
              <input
                className="bg-[#eeeeee] rounded  mb-7 py-2 px-4 border w-full text-lg placeholder:text-base "
                type="email"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
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
                onChange={(e)=>{
                    setPassword(e.target.value)
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
     
    
            <Link to="/driver-signup" className=" text-black-600 text-center">New Here? <span className='mb-2 underline text-blue-700'>Create An Account</span> </Link>
            </form>
          </div>
          <div>
            <Link to='/user-login'>
            <button className="bg-black
                text-white font-semibold rounded-lg
                 mb-7 py-2 px-4 border w-full text-lg placeholder:text-base" >
                Sign in User
            </button>
            </Link>
           
          </div>
    
        </div>
      );
};

export default DriverLogin;