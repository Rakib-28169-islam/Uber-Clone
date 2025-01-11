import React, { createContext, useState } from 'react';

export const DriverDataContext = createContext();
const DriverContext = ({children}) => {
    const  [ driver, setDriver ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

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
            <DriverDataContext.Provider value={{setDriver,driver}}>
                {children}
            </DriverDataContext.Provider>

            
        </div>
    );
};

export default DriverContext;