import React from 'react';
import {useContext,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
const token = localStorage.getItem('token');
const ProtectPage = ({children}) => {

    const  navigate = useNavigate();
    const {user,setUser} = useContext(UserDataContext)
   const token = localStorage.getItem('token');
    useEffect(()=>{
       
        if(!token)
            {
                navigate('/user-login');
        
            }

    },[token])
   
    return (
        <div>
            {
                children
            }
            
        </div>
    );
};

export default ProtectPage;