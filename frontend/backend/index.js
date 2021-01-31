const express = require("express");
const cors = require("cors");
const session = require("express-session");
const store = require("better-express-store");
const app = express();
const RestApi = require("./RestApi");
const ACL = require("./ACL");
const ACLsettings = require("./ACLSettings");
const path = require("path");
const pathToDb = path.join(__dirname, "../animalforum.db");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition:{
    info:{
      title: "Monzoo Api", 
      version: "1.0.0"
    }
  },
  apis: ["RestApi.js"]
}



const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
 console.log(swaggerDocs);
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
    store: store({ dbPath: pathToDb }),
  })
);

app.use(ACL(ACLsettings));

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

new RestApi(app, "/api/", pathToDb);
