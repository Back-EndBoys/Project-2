module.exports = function (sequelize, DataTypes) {
    var Votes = sequelize.define("Votes", {
        // Giving the Votes model a name of type
        voted: {
            type: DataTypes.BOOLEAN,
            defaultValue: null,
        }
    },{
            freezeTableName: true
        });
    return Votes;
};
