const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
const express = require("express");
const connectDB = require("./db/db");
const userRoutes = require("./routes/user.routes");
const driverRoutes = require("./routes/driver.routes");
const mapRoutes = require("./routes/map.routes");
const rideRoutes = require("./routes/ride.routes");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
connectDB();
// Use CORS Middleware
// app.use(
//     cors({
//       origin: "http://192.168.1.109:5173", // Your Vite development server
//       methods: ["GET", "POST", "PUT", "DELETE"], // HTTP methods allowed
//       credentials: true, // If using cookies or authentication headers
//     })
//   );

// app.use(cors({
//     origin: "http://192.168.1.109:5173", // Replace with your Vite server's address
//   }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.get("/",(req,res)=>{
    res.send("hello world");
})
app.use("/users",userRoutes);
app.use("/drivers",driverRoutes);
app.use("/map",mapRoutes);
app.use("/ride",rideRoutes);


module.exports = app;