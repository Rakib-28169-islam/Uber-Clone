const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
const express = require("express");
const connectDB = require("./db/db");
const userRoutes = require("./routes/user.routes");
const driverRoutes = require("./routes/driver.routes");
const cookieParser = require("cookie-parser");
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.get("/",(req,res)=>{
    res.send("hello world");
})
app.use("/users",userRoutes);
app.use("/drivers",driverRoutes);


module.exports = app;