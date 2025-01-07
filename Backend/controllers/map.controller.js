const mapService = require('../services/map.service');
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { address } = req.query;
    console.log(address);

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

module.exports.getDistanceAndTime = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {origin,destination} = req.query;
    console.log(origin,destination);

    try{
              
        const distanceTime = await mapService.getDistanceAndTime(origin,destination);
        res.status(200).json(distanceTime);
    }
    catch(err)
    {
        res.status(404).json({message:"Distance and time not found"});
    }
}

module.exports.getSuggestions = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {input} = req.query;
    console.log(input);
    try{
        const suggestions = await mapService.getSuggestions(input);
        res.status(200).json(suggestions);
        //const suggestions = await 
    }catch(err){
        res.status(404).json({message:"Suggestions not found"});
    }
}
