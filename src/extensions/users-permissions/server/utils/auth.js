const crypto = require("crypto");
const otpGenerator = require("otp-generator");
const { getService } = require("@strapi/plugin-users-permissions/server/utils");

const sendOtpCode = async ({ payload: { user, otpCode } }) => {
  await strapi.plugin("email").service("email").send({
    to: user.email,
    from: "no-reply@strapi.io",
    subject: "Please Verify your email address.",
    text: otpCode,
  });
};

const createOtpToken = async ({ payload: { userId } }) => {
  const otpCode = otpGenerator.generate(5, {
    digits: true,
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });

  const verifyOtpToken = crypto
    .createHash("sha256")
    .update(otpCode)
    .digest("hex");

  const verifyOtpExpires = Date.now() + 3 * 60 * 1000 + 30 * 1000;

  await getService("user").edit(userId, { verifyOtpToken, verifyOtpExpires });

  return { otpCode };
};

module.exports = {
  createOtpToken,
  sendOtpCode,
};
