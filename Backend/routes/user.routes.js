const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const UserController = require("../controllers/user.controller");

router.post("/register",[
    body('fullName.fName').isLength({min:3}).withMessage("First Name should be at least 3 characters long"),
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:4}).withMessage("Password should be at least 4 characters long")
],UserController.registerUser
)
router.post('/login',[
    body('email').isEmail().withMessage("PLEASE ENTER A VALID EMAIL"),
    body('password').isLength({min:4}).withMessage("Password should be at least 4 characters long")
],UserController.loginUser)

module.exports = router;