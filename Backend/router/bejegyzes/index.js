//Imports
const { Router } = require("express");
const { Bejegyzes, Marka, Link, Felhasznalo } = require("../../schema");
const yup = require("yup");
const { convert } = require("url-slug");
const loginMiddleware = require("../../middleware/user");
const adminMiddleware = require("../../middleware/admin");
const szerMiddleware = require("../../middleware/szer");
const { Op, INTEGER } = require("sequelize");
const router = Router();

const bejegyzesMinta = yup.object().shape({
  cim: yup
    .string()
    .min(3, "A cím nem elég hosszú!")
    .max(50, "A cím túl hosszú!")
    .required("A cím megadása kötelező!"),
  tartalom: yup.string().required("Tartalom megadása kötelező!"),
  linkek: yup
    .array()
    .of(yup.string().url("Valamely URL hibás!"))
    .required("Legalább egy URL megadása kötelező!"),
  autoTipus: yup
    .string()
    .min(3, "A autó típus mező nem elég hosszú!")
    .max(20, "A autó típus mező túl hosszú!")
    .required("Az autó típus megadása kötelező!"),
});

const ellenorzes = async (req, res, next) => {
  try {
    await bejegyzesMinta.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

router.get("/", async (req, res) => {
  const { limit } = req.query;

  const bejegyzesek = await Bejegyzes.findAll({
    where: {
      jovahagyva: true,
    },
    order: [["datum", "DESC"]],
    limit: limit ? parseInt(limit) : 25,
    include: [{ model: Link, attributes: ["link"] }],
  });

  if (bejegyzesek.length < 1) return res.status(404).send([]);


  const kimenet = bejegyzesek.map((bejegyzes) => {

    const test = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/img;


    return {
      cim: bejegyzes.cim,
      autoTipus: bejegyzes.autoTipus,
      datum: bejegyzes.datum,
      slug: bejegyzes.slug,
      linkek: bejegyzes.Links?.map((l) => l.link),
      bejegyzesID: bejegyzes.bejegyzesID,
      jovahagyva: bejegyzes.jovahagyva,
      video: bejegyzes.Links?.map((l) => {
        return test?.test(l.link)
      }).some(i => i== true)
    };
  });

  res.status(200).send(kimenet);
});

router.get("/osszes", adminMiddleware, async (req, res) => {
  const { limit } = req.query;

  const bejegyzesek = await Bejegyzes.findAll({
    order: [["datum", "DESC"]],
    limit: limit ? parseInt(limit) : 25,
    include: [{ model: Link, attributes: ["link"] }],
  });

  if (bejegyzesek.length < 1) return res.status(404).send([]);


  const kimenet = bejegyzesek.map((bejegyzes) => {

    const test = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/img;


    return {
      cim: bejegyzes.cim,
      autoTipus: bejegyzes.autoTipus,
      datum: bejegyzes.datum,
      slug: bejegyzes.slug,
      linkek: bejegyzes.Links?.map((l) => l.link),
      bejegyzesID: bejegyzes.bejegyzesID,
      jovahagyva: bejegyzes.jovahagyva,
      video: bejegyzes.Links?.map((l) => {
        return test?.test(l.link)
      }).some(i => i== true)
    };
  });

  res.status(200).send(kimenet);
});

router.get("/kereses", async (req, res) => {
  const { szoveg, markaID, limit } = req.query;

  const bejegyzesek = await Bejegyzes.findAll({
    where: {
      jovahagyva: true,
      //markaID: markaID ? parseInt(markaID) : { [Op.ne]: null },

      [Op.or]: [
        {
          cim: {
            [Op.like]: `%${szoveg}%`,
          },
        },
        {
          autoTipus: {
            [Op.like]: `%${szoveg}%`,
          },
        },
        {
          tartalom: {
            [Op.like]: `%${szoveg}%`,
          },
        },
      ],
    },
    limit: limit ? parseInt(limit) : 25,    include: [{ model: Link, attributes: ["link"] }],

  });

  const kimenet = bejegyzesek.map((bejegyzes) => {
    return {
      cim: bejegyzes.cim,
      autoTipus: bejegyzes.autoTipus,
      datum: bejegyzes.datum,
      slug: bejegyzes.slug,
      linkek: bejegyzes.Links?.map((l) => l.link),
      bejegyzesID: bejegyzes.bejegyzesID,
      jovahagyva: bejegyzes.jovahagyva
    };
  });

  return res.status(200).send(kimenet);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const bejegyzes = await Bejegyzes.findOne({
    where: {
      bejegyzesID: id,
      jovahagyva: true,
    },

    include: [
      {
        model: Marka,
        attributes: ["marka"],
      },
      { model: Link, attributes: ["link"] },
    ],
  });

  if (!bejegyzes) return res.status(404).send({ error: "Poszt nem található" });


  const kimenet = {
    bejegyzesID: bejegyzes.bejegyzesID,
    cim: bejegyzes.cim,
    tartalom: bejegyzes.tartalom,
    autoTipus: bejegyzes.autoTipus,
    datum: bejegyzes.datum,
    felhasznaloID: bejegyzes.felhasznaloID,
    marka: bejegyzes.Marka?.marka,
    jovahagyva: bejegyzes.jovahagyva,
    linkek: bejegyzes.Links?.map((l) => l.link),
    slug: bejegyzes.slug,
  };

  if (!bejegyzes) return res.status(404).send({ error: "Poszt nem található" });

  res.status(200).send(kimenet);
});


router.get("/slug/:slug", async (req, res) => {
  const { slug } = req.params;

  const bejegyzes = await Bejegyzes.findOne({
    where: {
      slug: slug,
      jovahagyva: true,
    },

    include: [
      {
        model: Marka,
        attributes: ["marka"],
      },
      { model: Link, attributes: ["link"] },
      { model: Felhasznalo},
    ],
  });

  if (!bejegyzes) return res.status(404).send({ error: "Poszt nem található" });


  const kimenet = {
    bejegyzesID: bejegyzes.bejegyzesID,
    cim: bejegyzes.cim,
    tartalom: bejegyzes.tartalom,
    autoTipus: bejegyzes.autoTipus,
    datum: bejegyzes.datum,
    felhasznaloID: bejegyzes.felhasznaloID,
    marka: bejegyzes.Marka?.marka,
    jovahagyva: bejegyzes.jovahagyva,
    linkek: bejegyzes.Links?.map((l) => l.link),
    slug: bejegyzes.slug,
    felhasznalo: {
      nev: bejegyzes?.Felhasznalo?.nev,
      email: bejegyzes?.Felhasznalo?.email,
      felhasznaloID: bejegyzes?.Felhasznalo?.felhasznaloID
    }
  };

  if (!bejegyzes) return res.status(404).send({ error: "Poszt nem található" });

  res.status(200).send(kimenet);
});

router.post("/uj", szerMiddleware, ellenorzes, async (req, res) => {
  const { cim, tartalom, autoTipus, markaID, linkek } = req.body;
  const slugCim = convert(cim);

  const felhasznaloID = req?.user?.felhasznaloID;
  if (markaID) {
    const marka = await Marka.findOne({
      where: {
        markaID: parseInt(markaID),
      },
    });

    if (!marka)
      return res.status(400).send({ error: "Megadott márka nem található" });
  }
  const [meglevo, uj] = await Bejegyzes.findOrCreate({
    where: {
      slug: slugCim,
    },
    defaults: {
      cim: cim,
      tartalom: tartalom,
      autoTipus: autoTipus,
      markaID: markaID,
      slug: slugCim,
      felhasznaloID: felhasznaloID,
    },
  });

  if (uj) {
    linkek?.map(async (l) => {
      await Link.create({
        link: l,
        bejegyzesID: meglevo?.bejegyzesID,
      });
    });
    return res.status(200).send({ status: "Letrehozva" });
  } else {
    return res.status(400).send({ error: "Már létezik ilyen című bejegyzés!" });
  }
});

router.delete("/:id", loginMiddleware, async (req, res) => {
  const { id } = req.params;

  const felhasznalo = await Felhasznalo.findOne({
    where: {
      felhasznaloID: req?.user?.felhasznaloID,
    },
  });
  if (!felhasznalo)
    return res.status(404).send({ error: "Felhasználó nem található" });

  const bejegyzes = await Bejegyzes.findOne({
    where: {
      bejegyzesID: parseInt(id),
    },
  });

  if (!bejegyzes) return res.status(404).send({ error: "Poszt nem tallható" });

  if (
    felhasznalo.jog > 1 ||
    bejegyzes.felhasznaloID == req?.user?.felhasznaloID
  ) {
    bejegyzes.destroy().then(() => {
      return res.status(200).send({ status: "Törölve" });
    });
  } else {
    return res.status(403).send({ error: "Nincs jogosultságod a törléshez!" });
  }
});
router.post("/:id/jovahagy", adminMiddleware, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send({ error: "Poszt nem tallható" });

  const bejegyzes = await Bejegyzes.findOne({
    where: {
      bejegyzesID: parseInt(id),
    },
  });

  if (!bejegyzes) return res.status(404).send({ error: "Poszt nem található" });

  bejegyzes.jovahagyva = true;
  bejegyzes.save().then(() => {
    return res.status(200).send({ status: "Jovahagyva" });
  });
});

module.exports = router;
