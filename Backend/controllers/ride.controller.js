
const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/map.service');
//const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { pickup, destination, vehicleType,price } = req.body;
    const user = req.user._id;
    console.log(user,pickup,destination,vehicleType ,price);
    try{
        const ride = await  rideService.createRide({user,pickup,destination,vehicleType,price});
        res.status(201).json(ride);

    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports.getFare = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {origin,destination} = req.query;

    try{
        const fare = await rideService.getFair(origin,destination);
        console.log(fare)
        return res.status(200).json(fare);
    }
    catch(err){
        res.status(500).json({message:"Internal server error ride controller line 38"});

    }
}