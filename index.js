const express = require("express");
const fetch = require("node-fetch");
const appConst = require("./src/constants");
const routesApplier = require("./src/routes/routeApplier");

const app = express();

routesApplier.init(app);

const server = app.listen(appConst.port, () => {
  console.log(`listening at http://localhost:${appConst.port}/`);
});
