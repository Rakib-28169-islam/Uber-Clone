const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const driverModel = require("../models/driver.model");
const authUser = require("../middlewares/auth.middleware");
const driverController = require("../controllers/driver.controller");
const blacklistModel = require("../models/blacklist.model");

router.post("/register",
    [
        body("fullName.fName").isLength({min:4}).withMessage("First Name should be at least 4 characters long"),
       // body("fullName.lName").isLength({min:3}).withMessage("Last Name should be at least 3 characters long"),
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("phone").isLength({min:10,max:10}).withMessage("Phone number should be at least 10 characters long"),
        body("password").isLength({min:4}).withMessage("Password should be at least 4 characters long"),
        body("vehicle.name").isLength({min:3}).withMessage("Vehicle name should be at least 3 characters long"),
        body("vehicle.color").isLength({min:3}).withMessage("Color should be at least 3 characters long"),
        body("vehicle.plate").isLength({min:3}).withMessage("Plate should be at least 3 characters long"),
        body("vehicle.capacity").isInt({min:1}).withMessage("Capacity must be at least 1"),
        body("vehicle.vehicleType").isIn(["Car","Motorcycle","Auto"]).withMessage("Invalid vehicle type")

    ],
    driverController.registerDriver   
)

router.post("/login",
    [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password").isLength({min:4}).withMessage("Password should be at least 4 characters long")
    ],
    driverController.loginDriver
)

router.get("/profile",authUser.authDriver,driverController.getDriverProfile);
router.get("/logout",authUser.authDriver,driverController.logOutDriver);
module.exports = router;
