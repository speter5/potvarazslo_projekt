//Imports
const { Router } = require("express");
require("dotenv").config();

//Router
const router = Router();

router.use("/auth", require("./auth"));
router.use("/felhasznalo", require("./felhasznalo"));
router.use("/bejegyzes", require("./bejegyzes"));

module.exports = router;
