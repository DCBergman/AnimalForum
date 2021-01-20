const express = require("express");
const cors = require("cors");
const session = require("express-session");
const store = require("better-express-store");
const app = express();
const RestApi = require("./RestApi");
const ACL = require("./ACL");
const ACLsettings = require("./ACLsettings");

app.use(express.json());

//app.use(cors());

app.use((error, req, res, next) => {
  console.log("ERROR", error);
  if (error) {
    res.status(500);
    res.json({
      error: "Something went wrong - probably badly formatted JSON",
      errorDetails: error,
    });
  }
});

app.use(
  session({
    secret: require("./session-secret.json"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
    store: store({ dbPath: "./animalforum.db" }),
  })
);

app.use(ACL(ACLsettings));

app.listen(3001, () => {
  console.log("Listening on port 3000");
});

new RestApi(app, "/api/", "./animalforum.db");
