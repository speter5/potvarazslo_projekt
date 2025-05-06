const { sequelize, Felhasznalo } = require("./schema");

const express = require("express");
const app = express();
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

require("./auth/Login");

sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((error) => console.error("Database connection error:", error));

sequelize
  .sync({

  })
  .then(async () => {
    console.log("Database synced!");

    const [user, created] = await Felhasznalo.findOrCreate({
        where: {
           email: "admin@admin" 
        },
        defaults: {
          email: "admin@admin",
          jelszo: "x",
          nev: "admin",
          felhasznaloNev: "ADMIN",
          jog:10,
        },
      });


      if(created){
        user.createPassword("admin");
        console.log("Admin created");
      }
    
  })
  .catch((error) => console.error("Error syncing database:", error));

app.get("/", (req, res) => {
  res.send(`API ${process.env.API_VERSION}`);
});

const SessionStore = require("express-session-sequelize")(session.Store);
const sequelizeSessionStore = new SessionStore({
  db: sequelize,
});

//TODO: fix for new DB
app.use(
  session({
    secret: "sg5VmgX5AZ2V1Ot7NeKAGCGkFtB1qu8Y2Lak2MmaC",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 60000 * 60 * 24 * 7,
    },
    store: sequelizeSessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: [
  process.env.FRONTEND_URL,
  "http://127.0.0.1:3000", "http://localhost:3000"
], credentials: true }));

app.use("/api", require("./router"));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening on port ${process.env.SERVER_PORT}`);
});
