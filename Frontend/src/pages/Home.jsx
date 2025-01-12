import React, { useEffect, useRef, useState } from "react";
import  {useGSAP} from '@gsap/react'
import { gsap } from 'gsap';
const Home = () => {

  //ref
  const suggestionsPanel = useRef(null);

  const [pickup,setPickup] = useState('');
  const [drop,setDrop] = useState('');
  const [openPanel,setOpenPanel] = useState(false);

   const submitHandler = e =>{
    e.preventDefault();

    console.log(pickup,drop);

   }

   useEffect(()=>{
    if(openPanel)
    {
      gsap.to(suggestionsPanel.current,{
        height:'70%'
      })
    }
    else
    {
      gsap.to(suggestionsPanel.current,{
        height:'0%'
      })
    }
   },[openPanel])


  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className='w-16 absolute left-5 top-5'
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="w-screen h-screen z-0">
        <img
          className="pt-48"
          src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
          alt=""
        />
      </div>

     
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative'>
                    {/* <h5  className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5> */}
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>

                    <form onSubmit={(e)=>submitHandler(e)}>
                        <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-700 rounded-full"></div>
                        <input
                           
                           onClick ={()=>setOpenPanel(true)}
                           onChange={(e)=>setPickup(e.target.value)}
                           value={pickup}


                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                           
                           onClick ={()=>setOpenPanel(true)}
                           onChange={(e)=>setDrop(e.target.value)}
                           value={drop}


                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                </div>
                <div  ref={suggestionsPanel} className='h-0 bg-red-500 '>
                    
                </div>
            </div>
            <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                
            </div>
            <div  className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                
            </div>
    </div>
  );
};

export default Home;  