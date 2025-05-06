const { DataTypes, Model, Sequelize } = require("sequelize");

class Link extends Model {}

module.exports = function (sequelize) {
  return Link.init(
    {
      linkID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      bejegyzesID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      link: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      datum: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },

    {
      sequelize,
      modelName: "Link",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
