const Encrypt = require("./Encrypt");
const sqlite3 = require("better-sqlite3");

module.exports = class RestApi {
  constructor(expressApp, urlPrefix = "/api/", pathToDb) {
    this.app = expressApp;
    this.db = sqlite3(pathToDb);
    this.prefix = urlPrefix;

    console.log(pathToDb);
    console.log(__dirname);
    let tables = this.getAllTables();
    console.log("tables: ", tables);
    for (let table of tables) {
      this.createGetAllRoute(table);
      this.createPostRoute(table);
      this.createGetRoute(table);
      this.createPutRoute(table);
      this.createDeleteRroute(table);
      this.createGetBySubforumIdRoute();
      this.createGetByThreadIdRoute();
      this.createGetSubforumByModeratorIdRoute();
      this.createDeleteModFromSubforumRoute();
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
      result.forEach((x) => delete x.password && delete x.email);
      res.json(result);
    });
  }

 
  /**
   * @swagger
   * /threads/subforumId:
   *  get:
   *   description: Get threads by subforum id
   *   responses:
   *     200:
   *      description: Succsess
   *
   * 
   *
   *  */

  createGetBySubforumIdRoute() {
    this.app.get(this.prefix + "subforums/threads/:id", (req, res) => {
      let statement = this.db.prepare(`
     SELECT * FROM  threads
     WHERE subforumId = $id`);
      let result = statement.all(req.params) || null;

      res.json(result);
    });
  }

  createGetByThreadIdRoute() {
    this.app.get(this.prefix + "posts/:threadId", (req, res) => {
      let statement = this.db.prepare(`
     SELECT * FROM  posts
     WHERE threadId = $threadId`);
      let result = statement.all(req.params) || null;

      res.json(result);
    });
  }

  createDeleteModFromSubforumRoute() {
    this.app.delete(
      this.prefix + "moderators/:subforumId/:userId",
      (req, res) => {
        let statement = this.db.prepare(`
      DELETE FROM moderators
      WHERE userId = $userId
      AND subforumId = $subforumId`);
        res.json(statement.run(req.params));
      }
    );
  }

  createGetSubforumByModeratorIdRoute() {
    this.app.get(this.prefix + "subforums/user/:moderatorId", (req, res) => {
      let statement = this.db.prepare(`
      SELECT *
      FROM subforums
      WHERE id IN (SELECT subforumId
                   FROM moderators
                   WHERE userId = $moderatorId )`);
      let result = statement.all(req.params) || null;

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
        delete result.email;
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

    this.app.get(this.prefix + "login", (req, res) => {
      res.json(req.session.user || null);
    });

    this.app.delete(this.prefix + "login", (req, res) => {
      delete req.session.user;
      res.json({ loggedOut: true });
    });
  }
};
