//Configuring Dotenv to use environment variables from .env file
const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `.env.${environment}` });
console.log("Running in environment:", environment);

//Import Modules
const path = require("path");

//Connecting the database
const connectDB = require("./config/db");
connectDB();

//Creating express server
const express = require("express");
const app = express();

//Specifying the port
const port = process.env.PORT || 5000;

//Serving Static Folder
app.use(
  "/api/public/images",
  express.static(path.join(__dirname, "/public/images"))
);
app.use("/v1/logs", express.static(path.join(__dirname, "/logs")));

// CORS Handler
const corsHandler = require("./middlewares/corsHandler");
app.use(corsHandler);

//Using Express.JSON
app.use(express.json());

//Routes
const indexRoutes = require("./routes/indexRoutes");
app.use("/api", indexRoutes);

// Error Handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

//Swagger
// Swagger
const { swaggerUi, swaggerDocs } = require("./config/swaggerConfig");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Listening om the port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
