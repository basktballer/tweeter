"use strict";

// Express, MongoDB setup:

require('dotenv').config();
const PORT          = process.env.PORT;
const express       = require("express");
const bodyParser    = require("body-parser");
const {MongoClient} = require("mongodb");
const MONGODB_URI = process.env.MONGODB_URI;
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // pass mongodb to DataHelpers function factory
  const DataHelpers = require("./lib/data-helpers.js")(db);
  
  // pass DataHelpers functions to tweetsRoutes
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  
  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
