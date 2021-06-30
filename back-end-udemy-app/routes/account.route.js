const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const auth = require("../middlewares/auth.mdw");
const userModel = require("../models/user.model");
const { route } = require("./auth.route");

const router = express.Router();

//const authMdw = require("../../middlewares/auth.mdw");

//const upload = require('../../middlewares/multer.mdw').UploadUser();
const EmptyImage = "public/imgs/Users/UserEmptyImage.jpg";

router.post("/", async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  console.log(req.body.dob);
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

router.get("/", auth, async (req, res) => {
  const allUser = await userModel.all();

  res.json({
    data: [...allUser],
  });
});

router.get("/:id", auth, async (req, res) => {
  const { userId } = req.params.id;
  const user = await userModel.single(userId);

  res.json({
    data: [user],
  });
});

module.exports = router;
