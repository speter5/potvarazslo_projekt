//Imports
const { Router } = require("express");
const { Felhasznalo, Bejegyzes } = require("../../schema");

const router = Router();
router.get("/", require("../../middleware/user"), async (req, res) => {
  const felhasznalo = await Felhasznalo.findOne({
    where: {
      felhasznaloID: req?.user?.felhasznaloID,
    },
    include: [
      {
        model: Bejegyzes,
      }
    ],
  });

  const { felhasznaloID, jog, nev, email, telefonszam } = felhasznalo;
  return res.send({
    felhasznaloID,
    jog,
    nev,
    email,
    telefonszam,
    bejegyzesek: felhasznalo?.Bejegyzes?.map((b) => {
      return {
        cim: b?.cim,
        autoTipus:b?.autoTipus,
        slug: b?.slug,
        datum:b?.datum,
        jovahagyva: b?.jovahagyva,
      };
    }),
  });
});
router.get("/:felhasznaloID", async (req, res) => {
  const { felhasznaloID } = req.params;
  if (!felhasznaloID)
    return res.status(400).send("FelhasznaloID megadása kötelező");

  const felhasznalo = await Felhasznalo.findOne({
    where: {
      felhasznaloID: felhasznaloID,
    },
    include: [
      {
        model: Bejegyzes,


      },
    ],
  });

  if (!felhasznalo) return res.status(404).send("Felhasznaló nem található");

  const { jog, nev, email, telefonszam } = felhasznalo;
  return res.send({
    felhasznaloID,
    jog,
    nev,
    email: jog== 5 ? email:null,
    telefonszam: jog== 5 ? telefonszam:null,
    bejegyzesek: felhasznalo?.Bejegyzes?.map((b) => {
      return {
        cim: b?.cim,
        autoTipus:b?.autoTipus,
        slug: b?.slug,
        datum:b?.datum,
      };
    }),
  });
});

module.exports = router;
