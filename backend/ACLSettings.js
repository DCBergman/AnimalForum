module.exports = {
  restPrefix: "/api/",
  users(user, method, req) {
    console.log("ACLS", user);
    //Allow everyone to create user
    if (method === "POST" && req.body.userRole === "basicUser") {
      return true;
    }
    if (method === "POST" && user.userRole === "admin") {
      return true;
    }
    //Allow all logged in users to see a list of other users
    if (method === "GET" && user.userRole) {
      return true;
    }
    //Allow admins to change info about user
    if (method === "PUT" && user.userRole === "admin") {
      return true;
    }
    //Allow user to change info about themselves
    if (method === "PUT" && req.url.split("/").pop() === user.id) {
      return true;
    }
    //Allow admins to delete users
    if (method === "DELETE" && user.userRole === "admin") {
      return true;
    }

    return false;
  },

  threads(user, method, req) {
    console.log("ACLS", user);
    //Allow everyone to create user
    if (method === "POST" && req.body.userRole === "basicUser") {
      return true;
    }
    if (method === "POST" && user.userRole === "admin") {
      return true;
    }
    //Allow all logged in users to see a list of other users
    if (method === "GET" && user.userRole) {
      return true;
    }
    //Allow admins to change info about user
    if (method === "PUT" && user.userRole === "admin") {
      return true;
    }
    //Allow user to change info about themselves
    if (method === "PUT" && req.url.split("/").pop() === user.id) {
      return true;
    }
    //Allow admins to delete users
    if (method === "DELETE" && user.userRole === "admin") {
      return true;
    }

    return false;
  },

  login() {
    return true;
  },
};
