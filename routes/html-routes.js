// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/homePage.html"));
  });

  // cms route loads addGif
  app.get("/addGif", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addGif.html"));
  });

  // blog route loads homePage.html
  app.get("/homePage", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/homePage.html"));
  });

  // authors route loads author-manager.html
  app.get("/Gif", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/GifDisplay.html"));
  });
  app.get("/allGifs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/allGifDisplay.html"));
  });


};
