//Other files can access the exported data via requiring this .js file and using Post.PROPERTY.
module.exports = function(sequelize, DataTypes)
{
  var Post = sequelize.define("Post",
  {
    title:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        len: [1]
      }
    },
    body:
    {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Post.associate = function(models)
  {
    // Each post must have a single Author.
    // A Post can't be created without an Author due to the foreign key constraint.
    Post.belongsTo(models.Author,
    {
      foreignKey:
      {
        allowNull: false
      }
    });
  };

  //Return the declared variable from above.
  return Post;
};