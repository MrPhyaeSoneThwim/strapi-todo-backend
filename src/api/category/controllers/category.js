"use strict";

/**
 *  category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async testPostRequest(ctx) {
      ctx.send(`Test Passed: ${ctx.request.body.name}`);
    },
    async testGetRequest(ctx) {
      ctx.send("Hello, welcome from test get request.");
    },
  })
);
