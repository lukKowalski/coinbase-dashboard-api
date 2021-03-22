const dashboard = require("./dashboard");

const routeApplier = (routes) => {
  const init = (app) => {
    routes.forEach((route) => {
      app[route.method](route.path, route.handler);
    });
  };

  return {
    init,
  };
};

//todo: put all routes here in the future
module.exports = routeApplier(dashboard.allRoutes);
