//Imports
const { Router } = require("express");
const { Felhasznalo } = require("../schema");

//Router
const router = Router();

router.use((req, res, next) => {
  if (req.user?.email) {
    Felhasznalo.findOne({
      where: {
        email: req.user?.email,
      },
    }).then((user) => {
      if (user?.jog >= 10) {
        next();
      } else {
        res.status(403).send({ status: "Forbidden" });
      }
    });
  } else {
    res.status(401).send({ status: "Unauthorized" });
  }
});

module.exports = router;
