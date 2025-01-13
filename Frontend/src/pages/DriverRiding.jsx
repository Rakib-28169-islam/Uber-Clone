import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import gsap from 'gsap';
import "remixicon/fonts/remixicon.css";
import FinishRide from '../components/FinishRide';
const DriverRiding = (props) => {
    const finishRidePanelRef = useRef(null);

    //state
     const [openRideDetails, setOpenRideDetails] = useState(false);

     useEffect(() => {
        if(openRideDetails){
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(0)",
            })
        } 
        else{
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(100%)",
            })
        }
    }, [openRideDetails]);

    



    return (
        <div className='h-screen relative flex flex-col justify-end'>

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/driver-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
               
            </div>
            <div className='h-4/5'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

        </div>

            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
                onClick={() => {
                    
                }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {
                    setOpenRideDetails(!openRideDetails)

                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>
                <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide
                setOpenRideDetails={setOpenRideDetails}
                />
            </div>

           

        </div>
    )
};

export default DriverRiding;