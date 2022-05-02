//dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

//express app stuff
const app = express();
const PORT = process.env.PORT || 3000;

// data parsing stuff
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//uses routes folder files
require('./routes/routes')(app);

// port listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  