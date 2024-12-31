const {validationResult} = require('express-validator');
const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');
const blacklistModel = require('../models/blacklist.model');
module.exports.registerDriver =async (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    console.log(req.body);
    const {fullName,email,phone,password,vehicle} = req.body;
    const isDriverAlready = await driverModel.findOne({email});
    if(isDriverAlready){
        return res.status(400).json({message:"Driver already exist"});
    }
    const hashedPassword = await driverModel.hashPassword(password);
    const driver = await driverService.createDriver ({
        fullName,email,phone,password:hashedPassword,vehicle
    })
    const token = driver.generateAuthToken();
    res.status(201).json({token,driver});



}
module.exports.loginDriver = async (req,res,next)=>{
    errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    const driver = await driverModel.findOne({email}).select("+password");
    if(!driver){
        return res.status(400).json({message:"Driver not found"});
    }
    const isMatch = await driver.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid password"});
    }
    const token = driver.generateAuthToken();
    await res.cookie("token",token);
    res.status(200).json({token,driver});

}
module.exports.getDriverProfile = async (req,res,next)=>{
    res.status(200).json(req.driver);
}
module.exports.logOutDriver = async (req,res,next)=>{

    res.clearCookie("token");
    const token = req.cookies.token||req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(400).json({message:"No token found"});
    }
    const expiresAt = new Date(Date.now() + 3*60); // Expiry time is 3 minutes from now
    const blacklist = await blacklistModel.create({token,expiresAt});
    res.status(200).json({message:"Logged out successfully"});

}