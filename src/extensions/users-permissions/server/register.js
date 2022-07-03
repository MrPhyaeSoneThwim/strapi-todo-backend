"use strict";
const fs = require("fs");
const path = require("path");

const authStrategy = require("@strapi/plugin-users-permissions/server/strategies/users-permissions");
const sanitizers = require("@strapi/plugin-users-permissions/server/utils/sanitize/sanitizers");

module.exports = ({ strapi }) => {
  strapi.container.get("auth").register("content-api", authStrategy);
  strapi.sanitizers.add("content-api.output", sanitizers.defaultSanitizeOutput);

  if (strapi.plugin("graphql")) {
    require("./graphql")({ strapi });
  }

  if (strapi.plugin("documentation")) {
    const specPath = path.join(__dirname, "../documentation/content-api.yaml");
    const spec = fs.readFileSync(specPath, "utf8");

    strapi.plugin("documentation").service("documentation").registerDoc(spec);
  }
};
