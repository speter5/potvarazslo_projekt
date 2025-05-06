const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB, {
  logging: false,
  sync: true,
});

const Felhasznalo = require("./Felhasznalo")(sequelize);
const Marka = require("./Marka")(sequelize);
const Link = require("./Link")(sequelize);
const Bejegyzes = require("./Bejegyzes")(sequelize);

/* Felhasznalo.hasMany(Bejegyzes, { foreignKey: "felhasznaloID" });
Bejegyzes.belongsTo(Felhasznalo, { foreignKey: "felhasznaloID" });
 */
/* Marka.belongsToMany(Bejegyzes, { foreignKey: "markaID", through: "markaT" });
Bejegyzes.hasOne(Marka, { foreignKey: "markaID" }); */

Bejegyzes.belongsTo(Marka, {
  foreignKey: "markaID",
});
Marka.hasMany(Bejegyzes, {
  foreignKey: "markaID",
  onDelete: "SET NULL",
});

Felhasznalo.hasMany(Bejegyzes, {
  foreignKey: "felhasznaloID",
});

Bejegyzes.belongsTo(Felhasznalo, {
  foreignKey: "felhasznaloID",
});

Bejegyzes.hasMany(Link, {
  foreignKey: "bejegyzesID",
});

Link.belongsTo(Bejegyzes, {
  foreignKey: "bejegyzesID",
  onDelete: "SET NULL",
});

module.exports = {
  sequelize,
  Felhasznalo,
  Marka,
  Link,
  Bejegyzes,
};
