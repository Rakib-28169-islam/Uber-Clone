const userModel = require("../models/user.model");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const driverModel = require("../models/driver.model");
module.exports.authUser =async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({message:"Unauthorized line-9 auth.middleware.js"});
    }
    const isBlacklisted = await blacklistModel.findOne({token});
    if(isBlacklisted)
    {
        return res.status(401).json({message:"Token expired line-14 auth.middleware.js/authUser"});
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        //console.log(req.user);
        return next();
    }
    catch(err)
    {
        return res.status(401).json({message:"Unauthorized line-20 auth.middleware.js"});
    }

}
module.exports.authDriver =async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({message:"Unauthorized line-34 authAdmin"});
    }
    const isBlacklisted = await blacklistModel.findOne({token});
    if(isBlacklisted)
    {
        return res.status(401).json({message:"Token expired line-39 authAdmin"});
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const driver = await driverModel.findById(decoded._id);
        req.driver = driver;
        
        return next();
    }
    catch(err)
    {
        return res.status(401).json({message:"Unauthorized line-53 auth.middleware.js"});
    }

}