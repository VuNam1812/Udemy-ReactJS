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
          res.json({
            error: "Token expired",
          });
          break;
        case "JsonWebTokenError":
          res.json({
            error: "Token invalid",
          });
          break;
        default:
          break;
      }
    }
  } else {
    res.json({
      message_err: "access token not found!!",
    });
  }
};
