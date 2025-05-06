//Imports
const { Router } = require("express");
const passport = require("passport");
const { Felhasznalo } = require("../../schema");
const yup = require("yup");
const { Op } = require("sequelize");
const cors = require("cors");
const { convert } = require("url-slug");

const router = Router();



const userInput = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  nev: yup
    .string()
    .min(4, "name must be at least 4 characters")
    .required("Name is required"),
  jelszo: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const validateUser = async (req, res, next) => {
  try {
    await userInput.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      
      res.redirect(401, "/login");
    }
    if (user) {
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect(200, "/");
      });
    } else {
      return res.redirect(401, "/login");
    }
  })(req, res);
});

router.get("/status", (req, res) => {
  return req.user
    ? res.send({ status: "Logged in" })
    : res.status(401).send({ status: "Unauthorized" });
});

router.post("/logout", async (req, res) => {
  req.logout(async function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(function () {
      res.clearCookie("connect.sid", { path: "/" });
      res.redirect(200, process.env.FRONTEND_URL);
    });
  });
});

router.post("/signup", validateUser, async function (req, res, next) {
  const { nev, email, jelszo, telefonszam } = req?.body;

  if (!nev || !email || !jelszo || !telefonszam)
    return res.status(400).send({ status: "Missing parameter" });
  const felhasznaloNev = convert(nev)

  const [user, created] = await Felhasznalo.findOrCreate({
    where: {
      [Op.or]: [{ email: email }],
    },
    defaults: {
      nev: nev,
      felhasznaloNev: felhasznaloNev,
      email: email,
      telefonszam: telefonszam ,
      jelszo: "x",
      pfp: "x",
      jog: 0
    
    },
  });
  if (created) {
    user.createPassword(jelszo);
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect(200, "/");
    });
  } else {
    return res.status(409).send({ status: "Email already in use" });
  }
});

module.exports = router;
