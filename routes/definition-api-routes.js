// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the definition
  app.get("/api/definitions", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findAll({
      where: query,
      include: [db.UserName]
    }).then(function(x) {
      res.json(x);
    });
  });
  // get definition by title
  app.get("/api/definitions/:title", function(req, res) {
    db.Definition.findOne({
      where: {
        title: req.params.title
      },
      include: [db.UserName]
    }).then(function(x) {
      res.json(x);
    });
  });
  // Get route for retrieving a single post
  app.get("/api/definitions/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Definition.findOne({
      where: {
        id: req.params.id
      },
      include: [db.UserName]
    }).then(function(x) {
      res.json(x);
    });
  });

  // POST route for saving a new post
  app.post("/api/definitions", function(req, res) {
    db.Definition.create(req.body).then(function(x) {
      res.json(x);
    });
  });

  // // DELETE route for deleting definition
  // app.delete("/api/definition/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // }); dont need to delete definitions

  // PUT route for updating definition
  // app.put("/api/definition", function(req, res) {
  //   db.Post.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // }); probably dont need to allow edits to definitions
};
