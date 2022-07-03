"use strict";

const checkName = require("../middlewares/checkName");
/**
 * category router.
 * extend existing core routes with custom routes
 */

const testPolicy = require("../policies/testPolicy");
const { createCoreRouter } = require("@strapi/strapi").factories;
const defaultRoutes = createCoreRouter("api::category.category");

const customRoutes = [
  {
    method: "POST",
    path: "/categories/test-post-request/:name",
    handler: "category.testPostRequest",
    config: {
      policies: [testPolicy],
      middlewares: [checkName],
    },
  },
  {
    method: "GET",
    path: "/categories/test-get-request",
    handler: "category.testGetRequest",
  },
];

const useBaseRoutes = (defaultRoutes, customRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return defaultRoutes.prefix;
    },
    get routes() {
      if (!routes) routes = customRoutes.concat(defaultRoutes.routes);
      return routes;
    },
  };
};

module.exports = useBaseRoutes(defaultRoutes, customRoutes);
