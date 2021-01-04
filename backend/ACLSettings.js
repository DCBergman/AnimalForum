module.exports = {
  restPrefix: "/api/",
  users(user, method, req) {
    //Allow everyone to create user
    if (method === "POST" && req.body.userRole === "basicUser") {
      return true;
    }
    if (method === "POST" && user.userRole === "admin") {
      return true;
    }
    //Allow all logged in users to see a list of other users
    if (method === "GET") {
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
    if (method === "POST" && user.userRole === "basicUser") {
      return true;
    }
    if (method === "GET" && user.userRole) {
      return true;
    }
    if (method === "PUT" && user.userRole === "admin") {
      return true;
    }
    if (method === "PUT" && req.url.split("/").pop() === user.id) {
      return true;
    }
    if (method === "DELETE" && user.userRole === "admin") {
      return true;
    }

    return false;
  },

  subforums(user, method, req) {
    console.log("ACLS", user);
    if (method === "POST" && user.userRole === "admin") {
      return true;
    }
    if (method === "GET") {
      return true;
    }
    if (method === "PUT" && user.userRole === "admin") {
      return true;
    }
    if (method === "DELETE" && user.userRole === "admin") {
      return true;
    }

    return false;
  },

  login() {
    return true;
  },
};
