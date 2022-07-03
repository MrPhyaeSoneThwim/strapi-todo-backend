module.exports = (plugin) => {
  plugin.controllers = require("./server/controllers");
  plugin.routes = require("./server/routes");

  return plugin;
};
