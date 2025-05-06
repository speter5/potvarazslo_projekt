const { DataTypes, Model, Sequelize } = require("sequelize");

class Marka extends Model {}

module.exports = function (sequelize) {
  return Marka.init(
    {
      markaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      marka: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "Marka",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
