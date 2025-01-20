const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const driverSchema = new mongoose.Schema({
    fullName: {
        fName: {
            type: String,
            required: true,
            minLength: [4, "First Name should be at least 4 characters long"],
        },
        lName: {
            type: String,
            minLength: [4, "Last Name should be at least 4 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [4, "Password should be at least 4 characters long"],
    },
    vehicle: {
        name: {
            type: String,
            required: true,
        },
        model: {
            type: String,
        },
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "moto", "auto"],
        },
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    // New location field in GeoJSON format
    location: {
        type: {
            type: String,
            enum: ["Point"], // GeoJSON type must be 'Point'
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            
        },
    },
});

// Add a 2dsphere index for geospatial queries
driverSchema.index({ location: "2dsphere" });

// Generate authentication token
driverSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};

// Compare passwords
driverSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Hash password
driverSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const driverModel = mongoose.model("driver", driverSchema);
module.exports = driverModel;
