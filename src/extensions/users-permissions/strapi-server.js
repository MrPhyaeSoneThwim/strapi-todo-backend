module.exports = (plugin) => {
  plugin.controllers = require("./server/controllers");
  plugin.routes = require("./server/routes");
  plugin.register = require("./server/register");

  return plugin;
};
