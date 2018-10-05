var db = require("../models");

module.exports = function (app) {
  app.get("/api/userNames", function (req, res) {

    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.UserName.findAll({
      include: [db.Definition]
    }).then(function (x) {
      res.json(x);
    });
  });

  app.get("/api/userNames/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.UserName.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Definition]
    }).then(function (x) {
      res.json(x);
    });
  });

  app.post("/api/userNames", function (req, res) {
    db.UserName.create(req.body).then(function (x) {
      res.json(x);
    });
  });

  app.get("/api/userNames/:googleID", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.UserName.findOne({
      where: {
        googleID: req.params.id
      }
    }).then(function (x) {
      res.json(x);
    });
  });

  // app.delete("/api/userNames/:id", function(req, res) {
  //   db.UserName.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(x) {
  //     res.json(x);
  //   });
  // }); wont need to delete anything

};
