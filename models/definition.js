module.exports = function(sequelize, DataTypes) {
  var Definition = sequelize.define("Definition", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    definition: {
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
    }
  });

  Definition.associate = function(models) {
    // We're saying that a Definition should belong to a UserName
    // A Definition can't be created without an UserName due to the foreign key constraint
    Definition.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
    Definiton.belongsToMany(models.votes, {
      through: models.votes
    });
  };

  return Definition;
};
