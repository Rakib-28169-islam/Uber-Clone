import React, { createContext, useState } from 'react';

export const DriverDataContext = createContext();
const DriverContext = ({children}) => {
    const  [ driverData, setDriverData ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();

    const updateDriver = (captainData) => {
        setDriver(captainData);
    };

    // const value = {
    //     driver,
    //     setDriver,
    //     isLoading,
    //     setIsLoading,
    //     error,
    //     setError,
    //     updateDriver
    // };
    return (
        <div>
            <DriverDataContext.Provider value={{setDriverData,driverData}}>
                {children}
            </DriverDataContext.Provider>

            
        </div>
    );
};

export default DriverContext;