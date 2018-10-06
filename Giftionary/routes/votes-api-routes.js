var db = require("../models");
module.exports = function(app) {
// PUT route for updating votes
  app.put("/api/votes", function(req, res) {
    db.Votes.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(x) {
      res.json(x);
    });
  });
}