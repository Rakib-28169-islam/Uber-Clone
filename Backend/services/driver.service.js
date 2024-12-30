const driverModel = require("../models/driver.model");

module.exports.createDriver = async({fullName,email,password,phone,vehicle})=>{

    const {fName,lName} = fullName;
    const {name,model,color,plate,capacity,vehicleType} = vehicle;
   
    if(!fName  || !email || !password || !phone || !name || !color || !plate || !capacity || !vehicleType)
    {
        throw new Error("All fields are required");
    }

    const driver = driverModel.create({
        fullName:{
            fName,
            lName
        },
        email,
        password,
        phone,
        vehicle:{
            name,
            model,
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return driver;

}