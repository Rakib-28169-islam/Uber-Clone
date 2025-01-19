const axios = require('axios');
const driverModel = require('../models/driver.model');
//const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey =process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
       // console.log('API Response:', response.data); 
        if (response.data.status === 'OK') {
            //console.log(response.data.results);
            
            const location = response.data.results[ 0 ].geometry.location;
            console.log(location);
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceAndTime = async (origin,destination) =>{
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    try{
        const url =`https://maps.gomaps.pro/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data.routes[0].legs[0]
        return{
            start_address:data.start_address,
            start_location:data.start_location,
            end_address:data.end_address,
            end_location:data.end_location,
            distance:data.distance,
            duration:data.duration
        }
    }
    catch(err)
    {
        console.error(err ," map service line 47");

    }
 
}

module.exports.getSuggestions = async (input) => {

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    try{
        const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data.predictions;
        return data;
    }catch(err){
        console.error(err);
        

    }
}

module.exports.getDriversInTheRadius = async (ltd, lng, radius) => {

    // radius in km

    const drivers = await driverModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ lng, ltd ], radius / 6371 ]
            }
        }
    });

    return drivers;


}