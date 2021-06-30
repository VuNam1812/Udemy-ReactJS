const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");

const userModel = require("../models/user.model");

const validate = require("../middlewares/validate.mdw");
const mailer = require("../middlewares/mailer.mdw");

const userSchema = require("../schemas/user.json");
const rfTokenSchema = require("../schemas/rfToken.json");

const router = express.Router();

router.post("/", validate(userSchema), async function (req, res) {
  const user = await userModel.findByEmail(req.body.email);
  if (user === null) {
    return res.json({
      authenticated: false,
    });
  }
  if (!bcrypt.compareSync(req.body.password, user.Password)) {
    return res.json({
      authenticated: false,
    });
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      permission: user.permission,
    },
    "SECRET_KEY",
    {
      expiresIn: 1 * 60, // seconds
    }
  );

  const refreshToken = randomstring.generate();
  await userModel.updateRefreshToken(user.id, refreshToken);
  res.json({
    authenticated: true,
    accountInfo: {
      username: `${user.firstName} ${user.lastName}`,
      role: user.Permission,
      imgSrc: user.srcImage,
    },
    accessToken,
    refreshToken,
  });
});

router.get("/is-confirmEmail", async function (req, res) {
  const code = req.query.code;
  if (code === req.session.codeConfirm) {
    return res.status(200).json({ status: true });
  }
  res.status(200).json({ status: false });
});

router.get("/is-available", async function (req, res) {
  const email = req.query.email;
  const isSentCode = req.query.isSentCode === "true";
  const user = await userModel.findByEmail(email);
  if (user === null) {
    req.session.codeConfirm = isSentCode ? await mailer.sendMail(email) : "";
    return res.status(200).json({
      status: true,
    });
  }

  res.status(200).json({ status: false });
});

router.post("/refresh", validate(rfTokenSchema), async function (req, res) {
  const { accessToken, refreshToken } = req.body;
  const { userId } = jwt.verify(accessToken, "SECRET_KEY", {
    ignoreExpiration: true,
  });

  const ret = await userModel.isValidRefreshToken(userId, refreshToken);
  if (ret === true) {
    const newAccessToken = jwt.sign({ userId }, "SECRET_KEY", {
      expiresIn: 60 * 1,
    });
    return res.json({
      accessToken: newAccessToken,
    });
  }

  res.status(400).json({
    message: "Invalid refresh token.",
  });
});

module.exports = router;
