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
      distance: distanceText,
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
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("Invalid input");
  }
  const fare = await getFair(pickup, destination);

  try {
    const ride = rideModel.create({
      user,
      pickup,
      destination,
      fare: fare[vehicleType],
      otp: getOtp(6),
    });
    //console.log(ride);
    return ride;
  } catch (err) {
    console.error(err, "on createRide");
    throw err;
  }
};
