module.exports = (ctx, next) => {
  console.log(ctx.params.name);
  if (ctx.params.name && ctx.params.name === "apple") {
    ctx.request.body = { name: "Apple" };
    return next();
  } else {
    return ctx.badRequest("Wrong Input", {
      message: "Access granted only the name is apple.",
    });
  }
};
