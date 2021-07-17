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

router.get("/", async (req, res) => {
  if (req.session.user) {
    const { userId } = req.session.user;
    const user = await userModel.single(userId);
    const accessToken = jwt.sign(
      {
        userId: user.id,
        permission: user.permission,
      },
      "SECRET_KEY",
      {
        expiresIn: 10 * 60, // seconds
      }
    );

    return res.json({
      authenticated: true,
      accountInfo: {
        id: user.id,
        username: `${user.firstName} ${user.lastName}`,
        role: user.permission,
        srcImage: user.srcImage,
      },
      accessToken: accessToken,
      refreshToken: user.rfToken,
    });
  }

  return res.json({
    authenticated: false,
    accessToken: "",
    refreshToken: "",
  });
});

router.post("/login", validate(userSchema), async function (req, res) {
  const user = await userModel.findByEmail(req.body.email);
  if (user === null) {
    return res.json({
      authenticated: false,
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
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
      expiresIn: 10 * 60, // seconds
    }
  );

  const refreshToken = randomstring.generate();
  await userModel.updateRefreshToken(user.id, refreshToken);

  req.session.user = {
    authenticated: true,
    userId: user.id,
  };

  return res.json({
    authenticated: true,
    accountInfo: {
      id: user.id,
      username: `${user.firstName} ${user.lastName}`,
      role: user.permission,
      srcImage: user.srcImage,
    },
    accessToken,
    refreshToken,
  });
});

router.post("/logout", (req, res) => {
  delete req.session.user;

  return res.json({
    authenticated: false,
    accessToken: "",
    refreshToken: "",
  });
});

router.get("/is-confirmEmail", async function (req, res) {
  const code = req.query.code;
  if (code === req.session.codeConfirm) {
    return res.status(200).json({ status: true });
  }
  return res.status(200).json({ status: false });
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

  return res.status(200).json({ status: false });
});

router.post("/refresh", validate(rfTokenSchema), async function (req, res) {
  const { accessToken, refreshToken } = req.body;
  const { userId, permission } = jwt.verify(accessToken, "SECRET_KEY", {
    ignoreExpiration: true,
  });

  const ret = await userModel.isValidRefreshToken(userId, refreshToken);

  if (ret === true) {
    const newAccessToken = jwt.sign(
      {
        userId,
        permission,
      },
      "SECRET_KEY",
      {
        expiresIn: 60 * 10,
      }
    );
    return res.json({
      accessToken: newAccessToken,
    });
  }

  return res.status(400).json({
    message: "Invalid refresh token.",
  });
});

module.exports = router;
