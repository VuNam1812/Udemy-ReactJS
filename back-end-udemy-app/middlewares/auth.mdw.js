const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const accessToken = req.headers["x-access-token"];
  if (accessToken) {
    try {
      const decode = jwt.verify(accessToken, "SECRET_KEY");
      req.accessTokenPayload = decode;
      next();
    } catch (error) {
      switch (error.name) {
        case "TokenExpiredError":
          return res.json({
            error: "Token expired",
          });

        case "JsonWebTokenError":
          return res.json({
            error: "Token invalid",
          });

        default:
          return;
      }
    }
  } else {
    return res.json({
      message_err: "access token not found!!",
    });
  }
};
