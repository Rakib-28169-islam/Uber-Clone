const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const driverModel = require("../models/driver.model");
const authUser = require("../middlewares/auth.middleware");
const driverController = require("../controllers/driver.controller");
const blacklistModel = require("../models/blacklist.model");

router.post("/register",
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullName.fName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 4 }).withMessage('Password must be at least 6 characters long'),
        body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
        body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
        body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
        body('vehicle.vehicleType').isIn([ 'car', 'moto', 'auto' ]).withMessage('Invalid vehicle type')

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
