// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var axios= require('axios')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));
app.get('/api/gifs/:id', function(request, res){
  
axios.get('http://cors.io/?http://api.giphy.com/v1/gifs/'+request.params.id+'?api_key=dc6zaTOxFJmzC')
.then(function (response) {
  res.send(response)
})
.catch(function (error) {
  console.log(error);
});

})

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/userName-api-routes")(app);
require("./routes/definition-api-routes")(app);
require("./routes/votes-api-routes")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
