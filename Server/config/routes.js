const controller  = require("../controllers/controller");
const path = require('path');

module.exports = function (app) {
  app.post("/api/login", controller.login);
  app.get("/api/logout", controller.logout);
  app.get("/api/login", controller.getUser);

  app.get('/api/products', controller.listProducts)
  app.get("/api/bids/:id", controller.getProdBids);
  app.get("/api/setprods", controller.setProducts);
  app.post("/api/bids/:id", controller.postBid);

  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./ngClient/dist/index.html"));
  });
}
