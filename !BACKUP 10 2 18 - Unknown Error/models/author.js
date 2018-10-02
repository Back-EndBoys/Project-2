//Other files can access the exported data via requiring this .js file and using Author.PROPERTY.
module.exports = function(sequelize, DataTypes)
{
  //The variable name we return.
  var Author = sequelize.define("Author", //"Name In Quotes" is object name for other files!
  {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  //Associate means to join tables!
  Author.associate = function(models)
  {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Author.hasMany(models.Post, //Each authoer may have many associated posts.
    {
      onDelete: "cascade"
    });
  };

  return Author; //Return the variable declared above.
};