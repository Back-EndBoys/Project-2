module.exports = function(sequelize, DataTypes) {
  var Definition = sequelize.define("Definition", {
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    definition:{
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    use:{
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    tags:{
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    link:{
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Definition.associate = function(models) {
<<<<<<< HEAD
    // We're saying that a Definition should belong to an Author
    // A Definition can't be created without an Author due to the foreign key constraint
    Definition.belongsTo(models.Author, {
      foreignKey: {
=======
    // We're saying that a Definition should belong to a UserName
    // A Definition can't be created without an UserName due to the foreign key constraint
    Definition.belongsToMany(models.UserName, {
      through: models.Votes
    });
    Definition.belongsTo(models.UserName, {
      foreignKey:{
>>>>>>> origin/development
        allowNull: false
      }
    });

<<<<<<< HEAD
    // Definiton.belongsToMany(models.votes, {
    //   through: models.votes
    // });
=======
>>>>>>> origin/development
  };

  return Definition;
};
