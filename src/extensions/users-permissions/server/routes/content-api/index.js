"use strict";

const authRoutes = require("./auth");
const userRoutes = require("@strapi/plugin-users-permissions/server/routes/content-api/user");
const roleRoutes = require("@strapi/plugin-users-permissions/server/routes/content-api/role");
const permissionsRoutes = require("@strapi/plugin-users-permissions/server/routes/content-api/permissions");

module.exports = {
  type: "content-api",
  routes: [...authRoutes, ...userRoutes, ...roleRoutes, ...permissionsRoutes],
};
