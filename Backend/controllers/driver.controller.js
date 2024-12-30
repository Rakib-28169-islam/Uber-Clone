const {validationResult} = require('express-validator');
const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');
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