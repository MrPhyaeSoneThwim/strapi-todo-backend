"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    extensionService.use(
      ({ nexus: { objectType, nonNull, extendType, inputObjectType } }) => {
        const StreetInput = inputObjectType({
          name: "StreetInput",
          definition(t) {
            t.string("street");
          },
        });

        const types = [
          objectType({
            name: "Address",
            definition(t) {
              t.string("street");
            },
          }),
        ];

        const queries = extendType({
          type: "Query",
          definition(t) {
            t.field("address", {
              type: "Address",
              args: {
                input: nonNull(StreetInput),
              },
              resolve(parent, args, context) {
                return {
                  street: `My place is on ${args.input.street}.`,
                };
              },
            });
          },
        });
        const resolversConfig = {
          "Query.address": {
            auth: false,
          },
        };
        return {
          types: [types, queries],
          resolversConfig,
        };
      }
    );
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
