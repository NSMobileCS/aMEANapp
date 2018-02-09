const controller  = require("../controllers/controller");
const path = require('path');

module.exports = function (app) {
  app.post("/login", controller.login);
  app.get("/logout", controller.logout);
  app.get("/login", controller.getUser);

  app.get("/ideas", controller.ideas);
  app.post("/ideas", controller.newIdea);
  app.get("/ideas/:id", controller.oneIdea);
  app.get("/ideas/like/:id", controller.like);

  app.get("/users", controller.users);
  app.get('/users/:id', controller.viewUser);
  app.all("*", (req, res, next) => {
    res.sendfile(path.resolve("./ngClient/dist/index.html"));
  });
}
