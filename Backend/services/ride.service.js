const mapService = require("./map.service");
const rideModel = require("../models/ride.model");
const crypto = require("crypto");
module.exports.getFair = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Invalid input on getFair");
  }
  try {
    const distanceTime = await mapService.getDistanceAndTime(
      pickup,
      destination
    );
    const distance = distanceTime.distance.value;
    const duration = distanceTime.duration.value;

    const durationText = distanceTime.duration.text;
    const distanceText = distanceTime.distance.text;

    const start_location =distanceTime.start_location;
    const end_location = distanceTime.end_location;

    const baseFare = {
      auto: 30,
      car: 50,
      moto: 20,
    };

    const perKmRate = {
      auto: 10,
      car: 15,
      moto: 8,
    };

    const perMinuteRate = {
      auto: 2,
      car: 3,
      moto: 1.5,
    };

    const fare = {
      auto: Math.round(
        baseFare.auto +
          perKmRate.auto * (distance / 1000) +
          perMinuteRate.auto * (duration / 60)
      ),
      car: Math.round(
        baseFare.car +
          perKmRate.car * (distance / 1000) +
          perMinuteRate.car * (duration / 60)
      ),
      moto: Math.round(
        baseFare.moto +
          perKmRate.moto * (distance / 1000) +
          perMinuteRate.moto * (duration / 60)
      ),
      duration: durationText,
      distance: distanceText,       //ltd lng
      start_location:start_location,//lat lng 
      end_location:end_location
    };

    return fare;
  } catch (err) {
    console.error(err ,"ride service line 58");
  }
};
function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
  price,
}) => {
  if (!user || !pickup || !destination || !vehicleType||!price) {
    throw new Error("Invalid input");
  }
  //const fare = await getFair(pickup, destination);

  try {
    const ride = rideModel.create({
      user,
      pickup,
      destination,
      fare: price,
      otp: getOtp(6),
    });
    //console.log(ride);
    return ride;
  } catch (err) {
    console.error(err, "on createRide line 94");
    throw err;
  }
};

module.exports.confirmRide = async (rideId,driver)=>{

  if(!rideId){
    throw new Error("Invalid ride id");
  }
  await rideModel.findOneAndUpdate({_id:rideId},{
    status:"accepted",
    driver:driver._id
  })

  const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('driver').select('+otp');

  if(!ride){
    throw new Error("Ride not found");
  }

  return ride;
}