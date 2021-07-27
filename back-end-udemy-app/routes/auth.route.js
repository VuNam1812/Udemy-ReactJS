const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const randomstring = require("randomstring");

const userModel = require("../models/user.model");

const fbLogin = require("../middlewares/fbLogin/fbLogin.mdw");
const ggLogin = require("../middlewares/fbLogin/ggLogin.mdw");
const validate = require("../middlewares/validate.mdw");
const mailer = require("../middlewares/mailer.mdw");

const userSchema = require("../schemas/user.json");
const rfTokenSchema = require("../schemas/rfToken.json");

const router = express.Router();

const generateToken = async (req, user) => {
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

  return {
    authenticated: true,
    accountInfo: {
      id: user.id,
      name: user.name,
      role: user.permission,
      srcImage: user.srcImage,
    },
    accessToken,
    refreshToken,
  };
};

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
        name: user.name,
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

router.post("/facebookLogin", async (req, res) => {
  //check exists
  if (
    !(await fbLogin.checkValidToken(req.body.access_token, req.body.userID))
  ) {
    return res.json({
      data: {
        authenticated: false,
        err_message: "Lỗi đăng nhập",
      },
    });
  }
  let user = await userModel.findById({ facebookId: req.body.userID });

  if (user === null) {
    const idUser = await fbLogin.createAccount(req.body);
    user = await userModel.single(idUser);
  }
  if (user.status === 0) {
    return res.json({
      authenticated: false,
      err_message: "Tài khoản đã bị khóa!!",
    });
  }
  //generate token
  return res.json(await generateToken(req, user));
});

router.post("/googleLogin", async (req, res) => {
  //check exists
  let user = await userModel.findById({
    googleId: req.body.userID,
  });
  if (user === null) {
    const idUser = await ggLogin.createAccount(req.body);
    user = await userModel.single(idUser);
  }
  if (user.status === 0) {
    return res.json({
      authenticated: false,
      err_message: "Tài khoản đã bị khóa!!",
    });
  }
  //generate token
  return res.json(await generateToken(req, user));
});

router.post("/login", validate(userSchema), async function (req, res) {
  const user = await userModel.findByEmail(req.body.email);
  if (user === null) {
    return res.json({
      authenticated: false,
      err_message: "Email không đúng",
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.json({
      authenticated: false,
      err_message: "Mật khẩu không đúng",
    });
  }

  if (user.status === 0) {
    return res.json({
      authenticated: false,
      err_message: "Tài khoản đã bị khóa!!",
    });
  }

  return res.json(await generateToken(req, user));
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
