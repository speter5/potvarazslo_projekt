const { DataTypes, Model, Sequelize } = require("sequelize");

class Bejegyzes extends Model {}

module.exports = function (sequelize) {
  return Bejegyzes.init(
    {
      bejegyzesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      cim: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      tartalom: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      autoTipus: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      datum: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      felhasznaloID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      markaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      /*       linkID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, */
      jovahagyva: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },

    {
      sequelize,
      modelName: "Bejegyzes",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
