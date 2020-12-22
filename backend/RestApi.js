const Encrypt = require("./Encrypt");
const sqlite3 = require("better-sqlite3");

module.exports = class RestApi {
  constructor(expressApp, urlPrefix = "/api/", pathToDb = "../animalforum.db") {
    this.app = expressApp;
    this.db = sqlite3(pathToDb);
    this.prefix = urlPrefix;

    let tables = this.getAllTables();
    for (let table of tables) {
      this.createGetAllRoute(table);
      this.createPostRoute(table);
      this.createGetRoute(table);
      this.createDeleteRroute(table);
      this.createPutRoute(table);
    }
    this.addLoginRoutes();
  }

  getAllTables() {
    let statement = this.db.prepare(`
  SELECT name 
  FROM sqlite_master
  WHERE type=$type
  `);

    return statement.all({ type: "table" }).map((x) => x.name);
  }

  createGetAllRoute(table) {
    this.app.get(this.prefix + table, (req, res) => {
      let statement = this.db.prepare("SELECT * FROM " + table);

      let result = statement.all();
      result.forEach((x) => delete x.password);
      res.json(result);
    });
  }

  createGetRoute(table) {
    this.app.get(this.prefix + table + "/:id", (req, res) => {
      let statement = this.db.prepare(`
     SELECT * FROM  ${table}
     WHERE id = $id`);
      let result = statement.get(req.params) || null;
      if (result) {
        delete result.password;
      }
      res.json(result);
    });
  }

  createPostRoute(table) {
    this.app.post(this.prefix + table, (req, res) => {
      let rb = req.body;
      if (rb.password) {
        rb.password = Encrypt.multiEncrypt(rb.password);
      }
      let sql = `INSERT INTO  ${table} 
    (${Object.keys(rb)}) 
    VALUES (${Object.keys(rb).map((x) => "$" + x)})                             
    `;
      let statement = this.db.prepare(sql);
      res.json(statement.run(rb));
    });
  }

  createPutRoute(table) {
    this.app.put(this.prefix + table + "/:id", (req, res) => {
      let rb = req.body;
      if (rb.password) {
        rb.password = Encrypt.multiEncrypt(rb.password);
      }

      rb.id = req.params.id;
      let sql = `UPDATE ${table} 
    SET ${Object.keys(rb).map((x) => x + " = $" + x)}
    WHERE id=$id                            
    `;
      let statement = this.db.prepare(sql);
      res.json(statement.run(rb));
    });
  }
  createDeleteRroute(table) {
    this.app.delete(this.prefix + table + "/:id", (req, res) => {
      let statement = this.db.prepare(`
    DELETE FROM ${table}
    WHERE id = $id`);
      res.json(statement.run(req.params));
    });
  }

  addLoginRoutes() {
    
    this.app.post(this.prefix + "login", (req, res) => {
      if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }
      let statement = this.db.prepare(`
         SELECT * FROM users
         WHERE email = $email AND password = $password
      `);
      let user = statement.get(req.body) || null;
      if (user) {
        delete user.password;
        req.session.user = user;
      }
      res.json(user);
    });

    // GET - check if logged in and return user if so
    this.app.get(this.prefix + "login", (req, res) => {
      res.json(req.session.user || null);
    });

    // DELETE - logged out a logged in user
    this.app.delete(this.prefix + "login", (req, res) => {
      delete req.session.user;
      res.json({ loggedOut: true });
    });
  }
};