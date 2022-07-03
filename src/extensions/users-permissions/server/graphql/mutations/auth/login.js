"use strict";

const { toPlainObject } = require("lodash/fp");

const {
  checkBadRequest,
} = require("@strapi/plugin-users-permissions/server/graphql/utils");

module.exports = ({ nexus, strapi }) => {
  const { nonNull } = nexus;

  return {
    type: nonNull("JSON"),

    args: {
      input: nonNull("UsersPermissionsLoginInput"),
    },

    async resolve(parent, args, context) {
      const { koaContext } = context;

      koaContext.params = { provider: args.input.provider };
      koaContext.request.body = toPlainObject(args.input);

      await strapi
        .plugin("users-permissions")
        .controller("auth")
        .callback(koaContext);

      const output = koaContext.body;

      checkBadRequest(output);

      return output;
    },
  };
};
