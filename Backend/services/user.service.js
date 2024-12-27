const userModel = require("../models/user.model");

module.exports.createUser = async({fName,lName,email,password})=>{

    if(!fName  || !email || !password)
    {
        throw new Error("All fields are required");
    }
    const user = userModel.create({
        fullName:{
            fName,
            lName
        },
        email,
        password
    })

    return user;

}