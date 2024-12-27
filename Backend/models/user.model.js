const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    fullName:{
        fName:{
            type:String,
            required:true,
            minLength:[3,"First Name should be at least 3 characters long"],
        },
        lName:{
            type:String,
            minLength:[3,"Last Name should be at least 3 characters long"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email"],

    },
    password:{
        type:String,
        required:true,
        select:false,
        minLength:[4,"Password should be at least 4 characters long"],
    },
    socketId:{
        type:String,
    }
    
})

userSchema.methods.generateAuthToken = function()
{
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
const userModel = mongoose.model('user',userSchema);

module.exports = userModel;