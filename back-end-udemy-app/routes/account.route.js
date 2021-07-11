const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.mdw");
const userModel = require("../models/user.model");
const handleAccount = require("../middlewares/route/account.mdw");

const fs = require("fs");

const router = express.Router();

const upload = require("../middlewares/multer.mdw").UploadUser();
const EmptyImage = "public/imgs/Users/UserEmptyImage.jpg";

router.post("/", async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const dob = moment(new Date(req.body.dob)).format("YYYY-MM-DD");
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash,
    dob: dob,
    email: req.body.email,
    permission: req.body.permission,
    status: 1,
    srcImage: EmptyImage,
  };

  const accountID = await userModel.add(user);
  res.status(200).json({
    id: accountID,
  });
});

router.get("/", async (req, res) => {
  const allUser = await userModel.all();
  res.json({
    data: [...allUser],
  });
});

router.get("/available", auth, async (req, res) => {
  const { email } = req.query;
  const { userId } = req.accessTokenPayload;

  const ret = await userModel.findByEmail(email, { id: userId });

  res.json({
    data: {
      available: ret !== null,
    },
  });
});

router.get("/verify", auth, async (req, res) => {
  const { password } = req.query;
  const { userId } = req.accessTokenPayload;

  const user = await userModel.single(userId);

  if (!bcrypt.compareSync(password, user.password)) {
    return res.json({
      data: {
        result: false,
      },
    });
  }

  res.json({
    data: {
      result: true,
    },
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { getInfo } = req.query;
  const user = await userModel.single(id);

  await handleAccount.getMoreInfoAccount(user, [].concat(getInfo));

  ["rfToken", "password"].map((item) => {
    delete user[item];
  });
  res.json({
    data: user,
  });
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;
  if (+id !== +userId) {
    res.json({
      data: {
        err_message: "Token invalid to update",
        updated: false,
      },
    });
  }

  if (req.body.password)
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  console.log(req.body);
  try {
    const result = await userModel.update(userId, {
      ...req.body,
    });
    res.json({
      data: {
        updated: true,
      },
    });
  } catch (error) {
    res.json({
      data: {
        updated: false,
        err_message: "Update failed",
      },
    });
  }
});

router.put("/upload", auth, upload.single("srcImage"), async (req, res) => {
  let { currentSrc } = req.body;
  const { userId } = req.accessTokenPayload;

  const result = await userModel.update(userId, {
    srcImage: req.file.path,
  });

  if (result) {
    currentSrc = currentSrc.replace("\\/g", "/");
    if (currentSrc !== EmptyImage) {
      fs.unlink(currentSrc, () => {});
    }
  }

  res.json({
    data: {
      srcImage: req.file.path,
    },
  });
});

module.exports = router;
