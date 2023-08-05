require("dotenv").config();
const winston = require("winston");
const express = require("express");
const config = require("config");

const app = express();

const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
const { Clerk } = require('@clerk/clerk-sdk-node');
const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY});
//console.log("Clerk Secret Key:", process.env.CLERK_BACKEND_API);


require("./startup/logging")();
require("./startup/cors")(app);
app.use(ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY
}));
// Use Clerk middleware
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
