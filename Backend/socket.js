const socketIo = require("socket.io");
const userModel = require("../Backend/models/user.model");
const driverModel = require("../Backend/models/driver.model");
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

    socket.on("disconnect", async (data) => {
      const { dataId, dataType } = data;
      if (dataType === "user") {
        await userModel.findByIdAndUpdate(dataId, { socketId: "" });
      } else if (dataType === "driver") {
        await driverModel.findByIdAndUpdate(dataId, { socketId: "" });
      }
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
