const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

const userService = require("../services/user.service");
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  const { fullName, email, password } = req.body;
  const isUserAlready = await userModel.findOne({ email });

  if (isUserAlready) {
      return res.status(400).json({ message: 'User already exist' });
  }
 
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser(
    {
    fName: fullName.fName,
    lName: fullName.lName,
    email,
    password: hashedPassword,
    }
);
  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};
module.exports.loginUser = async(req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  const user = await userModel.findOne({email}).select("+password");
  if(!user)
  {
    return res.status(400).json({message:"User not found"});
  }
  const isMatch = await user.comparePassword(password);
  if(!isMatch)
  {
    return res.status(400).json({message:"Invalid password"});
  }
  const token = user.generateAuthToken();
  res.status(200).json({token,user});

}
