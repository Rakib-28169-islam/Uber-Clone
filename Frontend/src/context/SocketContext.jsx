import {  useEffect, createContext } from "react";
import { io } from "socket.io-client";

export const SocketClientContext = createContext();
const socket = io(import.meta.env.VITE_BASE_URL);
const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Basic connection logic
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return (
    <SocketClientContext.Provider value={{ socket }}>
      {children}
    </SocketClientContext.Provider>
  );
};
export default SocketProvider;