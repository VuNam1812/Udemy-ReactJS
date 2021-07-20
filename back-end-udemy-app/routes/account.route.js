const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.mdw");

const userModel = require("../models/user.model");
const favoriteCourseModel = require("../models/favoriteCourse.model");
const joinModel = require("../models/joinInCourse.model");

const handleAccount = require("../middlewares/route/account.mdw");
const handleCourse = require("../middlewares/route/course.mdw");

const AwsService = require("../aws/index");

const router = express.Router();

const EmptyImage =
  "https://myedu-1612407.s3.sa-east-1.amazonaws.com/empty/UserEmptyImage.jpg";

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
  return res.status(200).json({
    id: accountID,
  });
});

router.get("/", async (req, res) => {
  const { getInfo } = req.query;
  const allUser = await userModel.all({ permission: 2 });
  for (const user of allUser) {
    delete user.rfToken;
    delete user.password;

    await handleAccount.getMoreInfoAccount(user, [].concat(getInfo));
  }

  return res.json({
    data: [...allUser],
  });
});

router.get("/available", auth, async (req, res) => {
  const { email } = req.query;
  const { userId } = req.accessTokenPayload;

  const ret = await userModel.findByEmail(email, { id: userId });

  return res.json({
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

  return res.json({
    data: {
      result: true,
    },
  });
});

router.get("/:id/coursesJoin", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;
  const { getInfo } = req.query;
  if (+id !== +userId) {
    return res.json({
      data: {
        error_message: "Access Token Invalid.",
      },
    });
  }

  const courses = await joinModel.allByUser(userId);

  for (const course of courses) {
    await handleCourse.getMoreInfoCourse(course, [].concat(getInfo));
  }

  return res.json({
    data: courses,
  });
});

router.get("/:id/coursesFavorite", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;
  const { getInfo } = req.query;

  if (+id !== +userId) {
    return res.json({
      data: {
        error_message: "Access Token Invalid.",
      },
    });
  }

  const courses = await favoriteCourseModel.allByUser(userId);

  for (const course of courses) {
    await handleCourse.getMoreInfoCourse(course, [].concat(getInfo));
  }

  return res.json({
    data: courses,
  });
});

router.get("/linkUpload", async (req, res) => {
  const { urlSaveObject, urlGetObject } = await AwsService.createLinkUpload(
    req.query,
    "avatar"
  );

  return res.json({
    data: {
      uri: { urlSaveObject, urlGetObject },
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
  return res.json({
    data: user,
  });
});

router.patch("/:id/active", auth, async (req, res) => {
  const { id } = req.params;
  const { permission } = req.accessTokenPayload;

  if (permission !== 0) {
    return res.json({
      data: {
        updated: false,
        err_message: "permission invalid",
      },
    });
  }

  try {
    const ret = await userModel.update(id, {
      status: req.body.status,
    });
    return res.json({
      data: {
        updated: true,
      },
    });
  } catch (error) {
    return res.json({
      data: {
        updated: false,
      },
    });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;
  if (+id !== +userId) {
    return res.json({
      data: {
        err_message: "Token invalid to update",
        updated: false,
      },
    });
  }

  if (req.body.password)
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  try {
    const result = await userModel.update(userId, {
      ...req.body,
    });
    return res.json({
      data: {
        updated: true,
      },
    });
  } catch (error) {
    return res.json({
      data: {
        updated: false,
        err_message: "Update failed",
      },
    });
  }
});

module.exports = router;
