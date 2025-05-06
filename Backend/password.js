const bcrypt = require("bcrypt");
var jelszo = "admin";
var titkositott = "";

function validPassword(jelszo) {
  return bcrypt.compareSync(jelszo, titkositott);
}
function createPassword(jelszo) {
  const salt = bcrypt.genSaltSync();
  titkositott = bcrypt.hashSync(jelszo, salt);
}

createPassword("admin");
console.log(validPassword(jelszo));
console.log(titkositott);
console.log("$2b$10$dPZzMl/LE/gYw")
