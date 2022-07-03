"use strict";

/**
 *  category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async testPostRequest(ctx) {
      ctx.send("Hello, welcome from test post request.");
    },
    async testGetRequest(ctx) {
      ctx.send("Hello, welcome from test get request.");
    },
  })
);
