const { DataTypes, Model, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

class Felhasznalo extends Model {
  validPassword(jelszo) {
    return bcrypt.compareSync(jelszo, this.jelszo);
  }
  createPassword(jelszo) {
    const salt = bcrypt.genSaltSync();
    this.jelszo = bcrypt.hashSync(jelszo, salt);
    this.save();
  }
}

module.exports = function (sequelize) {
  return Felhasznalo.init(
    {
      felhasznaloID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nev: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      jelszo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      felhasznaloNev: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      telefonszam: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      jog: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "Felhasznalo",
      freezeTableName: true,
      timestamps: false,
    }
  );
};
