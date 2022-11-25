const app = require("./app");
const connectDB = require("./config/database");
const cloudinary = require("cloudinary");

//handling uncought expection
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server due to uncought exception");
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const server = app.listen(process.env.PORT, () => {
  console.log(`Listaning on port ${process.env.PORT}`);
});



// unHandled promise rejection
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
