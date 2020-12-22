const express = require("express");
const session = require("express-session");
const store = require("better-express-store");
const app = express();
const RestApi = require("./backend/RestApi");
const ACL = require("./backend/ACL");
const ACLsettings = require("./backend/ACLsettings");


app.use(express.json());

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


app.listen(3000, () => {
  console.log("Listening on port 3000");
});

new RestApi(app, "/api/", "./animalforum.db");
