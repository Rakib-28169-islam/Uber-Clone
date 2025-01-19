const socketIo = require("socket.io");
const userModel = require("../Backend/models/user.model");
const driverModel = require("../Backend/models/driver.model");
const { disconnect } = require("mongoose");
let io;

function installSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("new user connected", socket.id);

    socket.on("join", async (data) => {
      const { dataId, dataType } = data;
      console.log(dataId, dataType, "in socket join port");

      if (dataType === "user") {
        await userModel.findByIdAndUpdate(dataId, { socketId: socket.id });
      } else if (dataType === "driver") {
        await driverModel.findByIdAndUpdate(dataId, { socketId: socket.id });
      }
    });

    socket.on("leave", async (data) => {
      const { dataId, dataType } = data;
      console.log(`${dataType} ${dataId} disconnected`);
      if (dataType === "user") {
        await userModel.findByIdAndUpdate(dataId, { socketId: "" });
      } else if (dataType === "driver") {
        await driverModel.findByIdAndUpdate(dataId, { 
            socketId: "",
            location:{
                ltd:0,
                lng:0
            }
        });

      }
    });
    socket.on("update-location-driver", async (data) => {
      const { driverId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        socket.emit("error", { message: "Invalid location data" });
      }

      //console.log(location)
      await driverModel.findByIdAndUpdate(driverId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected", socket.id);
    });
  });
}

function sendNotificationMessage(socketId, data) {
  console.log(socketId, data, "sendNotificationMessage line 48 socket.js");
  if (io) {
    io.to(socketId).emit(data.event, data.message);
  } else {
    console.log("socket not initialized line 56 socket.js");
  }
}

module.exports = { installSocket, sendNotificationMessage };
