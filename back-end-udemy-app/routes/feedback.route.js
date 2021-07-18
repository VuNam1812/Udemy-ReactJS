const express = require("express");

const feedbackModal = require("../models/feedback.model");

const router = express.Router();

const auth = require("../middlewares/auth.mdw");
const lectureModel = require("../models/lecture.model");

//const upload = require('../../middlewares/multer.mdw').UploadUser();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const feedback = await feedbackModal.single(id);

  return res.json({
    data: feedback,
  });
});

module.exports = router;
