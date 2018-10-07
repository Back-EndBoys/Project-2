module.exports = function(sequelize, DataTypes) {
  var UserName = sequelize.define("UserName", {
    // Giving the UserName model a name of type STRING
    name: DataTypes.STRING
  });

  UserName.associate = function(models) {
    // Associating UserName with definitions
    // When an UserName is deleted, also delete any associated definitions
   UserName.belongsToMany(models.Definition, {
      through: models.Votes
    });
    UserName.hasMany(models.Definition, {
      
    });
    
  };

  return UserName;
};
