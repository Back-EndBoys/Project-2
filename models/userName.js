module.exports = function(sequelize, DataTypes) {
  var UserName = sequelize.define("UserName", {
    // Giving the UserName model a name of type STRING
    name: DataTypes.STRING
  });

  UserName.associate = function(models) {
    // Associating UserName with definitions
    // When an UserName is deleted, also delete any associated definitions
    UserName.hasMany(models.Post, {
      onDelete: "cascade"
    });
    Definiton.belongsToMany(models.votes, {
      through: models.votes
    });
  };

  return UserName;
};
