"use strict";

const userUID = "plugin::users-permissions.user";
const roleUID = "plugin::users-permissions.role";

module.exports = (context) => {
  const { nexus, strapi } = context;

  const { naming } = strapi.plugin("graphql").service("utils");

  const user = strapi.getModel(userUID);
  const role = strapi.getModel(roleUID);

  const mutations = {
    // CRUD (user & role)
    [naming.getCreateMutationTypeName(
      role
    )]: require("@strapi/plugin-users-permissions/server/graphql/mutations/crud/role/create-role"),
    [naming.getUpdateMutationTypeName(
      role
    )]: require("@strapi/plugin-users-permissions/server/graphql/mutations/crud/role/update-role"),
    [naming.getDeleteMutationTypeName(
      role
    )]: require("@strapi/plugin-users-permissions/server/graphql/mutations/crud/role/delete-role"),
    [naming.getCreateMutationTypeName(
      user
    )]: require("@strapi/plugin-users-permissions/server/graphql/mutations/crud/user/create-user"),
    [naming.getUpdateMutationTypeName(
      user
    )]: require("@strapi/plugin-users-permissions/server/graphql/mutations/crud/user/update-user"),
    [naming.getDeleteMutationTypeName(
      user
    )]: require("@strapi/plugin-users-permissions/server/graphql/mutations/crud/user/delete-user"),

    // Other mutations
    login: require("./auth/login"),
    verifyOtp: require("./auth/verifyOtp"),
    resendOtp: require("./auth/resendOtp"),
    register: require("@strapi/plugin-users-permissions/server/graphql/mutations/auth/register"),
    forgotPassword: require("@strapi/plugin-users-permissions/server/graphql/mutations/auth/forgot-password"),
    resetPassword: require("@strapi/plugin-users-permissions/server/graphql/mutations/auth/reset-password"),
    emailConfirmation: require("@strapi/plugin-users-permissions/server/graphql/mutations/auth/email-confirmation"),
  };

  return nexus.extendType({
    type: "Mutation",

    definition(t) {
      for (const [name, getConfig] of Object.entries(mutations)) {
        const config = getConfig(context);

        t.field(name, config);
      }
    },
  });
};
