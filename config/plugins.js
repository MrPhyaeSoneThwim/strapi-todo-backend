module.exports = ({ env }) => {
  return {
    // ...
    email: {
      config: {
        provider: "nodemailer",
        providerOptions: {
          host: env("SMTP_HOST", "smtp.mailtrap.io"),
          port: env("SMTP_PORT", 2525),
          auth: {
            user: env("SMTP_USERNAME", "221ca7ad3e35b5"),
            pass: env("SMTP_PASSWORD", "fd1e7427789717"),
          },
          secure: env("NODE_ENV") === "development" ? false : true,
        },
        //   settings: {
        //     defaultFrom: "hello@example.com",
        //     defaultReplyTo: "hello@example.com",
        //   },
      },
    },
  };
};
