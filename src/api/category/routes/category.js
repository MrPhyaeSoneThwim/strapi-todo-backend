"use strict";

/**
 * category router.
 * extend existing core routes with custom routes
 */

const { createCoreRouter } = require("@strapi/strapi").factories;
const defaultRoutes = createCoreRouter("api::category.category");

const customRoutes = [
  {
    method: "POST",
    path: "/categories/test-post-request",
    handler: "category.testPostRequest",
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
