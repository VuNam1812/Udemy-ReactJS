const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const auth = require("../middlewares/auth.mdw");
const userModel = require("../models/user.model");
const { route } = require("./auth.route");
const handleAccount = require("../middlewares/route/account.mdw");
const handleCourse = require("../middlewares/route/course.mdw");
const courseModel = require("../models/course.model");
const teacherinfoModel = require("../models/teacherinfo.model");

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
  await teacherinfoModel.add({
    id_user: accountID,
    teacherDesc: "",
    major: "",
    techniques: "",
  });
  return res.status(200).json({
    id: accountID,
  });
});

router.get("/", async (req, res) => {
  const { getInfo } = req.query;
  const allUser = await userModel.all({
    permission: 1,
  });

  for (const user of allUser) {
    delete user.rfToken;
    delete user.password;

    await handleAccount.getMoreInfoAccount(user, [].concat(getInfo));
  }

  return res.json({
    data: {
      all: [...allUser],
    },
  });
});

router.get("/:id/courses", async (req, res) => {
  const { id } = req.params;

  const { getInfo } = req.query;

  const courses = await courseModel.singleByOwner(id);

  for (const course of courses) {
    await handleCourse.getMoreInfoCourse(course, [].concat(getInfo));
  }

  return res.json({
    data: courses,
  });
});

router.patch("/:id/moreInfo", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;

  if (+id !== +userId) {
    return res.json({
      data: {
        updated: false,
        err_message: "Invalid token to update",
      },
    });
  }

  try {
    await teacherinfoModel.update(userId, {
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
