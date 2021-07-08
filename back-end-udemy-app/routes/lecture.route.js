const express = require("express");

const lectureModel = require("../models/lecture.model");

const router = express.Router();

//const authMdw = require("../../middlewares/auth.mdw");

//const upload = require('../../middlewares/multer.mdw').UploadUser();
const EmptyImage = "public/imgs/Categories/CategoryEmptyImage.png";

router.get("/", async (req, res) => {
  res.json({
    data: [],
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const lecture = await lectureModel.single(id);
  res.json({
    data: lecture,
  });
});

router.get("/:id/courses", async (req, res) => {
  const { id } = req.params;

  const cats = await categoryModel.allWithId(id);

  let courses = [];

  for (const cat of cats) {
    courses = [...courses, ...(await courseModel.allWithCatId(cat.id))];
  }

  for (const course of courses) {
    await handleCourse.getMoreInfoCourse(course, [
      "lectureCount",
      "catName",
      "teacherName",
    ]);
  }

  res.json({
    data: [...courses],
  });
});

module.exports = router;
