const express = require("express");
const categoryModel = require("../models/category.model");
const courseModel = require("../models/course.model");
const handleCategory = require("../middlewares/route/category.mdw");
const handleCourse = require("../middlewares/route/course.mdw");
const router = express.Router();

//const authMdw = require("../../middlewares/auth.mdw");

//const upload = require('../../middlewares/multer.mdw').UploadUser();
const EmptyImage = "public/imgs/Categories/CategoryEmptyImage.png";

router.get("/", async (req, res) => {
  const { filter } = req.query;

  let res_data = {};
  switch (typeof filter) {
    case "string":
      res_data[filter] = (await handleCategory.getCategoryByFilter(filter))[
        filter
      ];
      break;

    default:
      res_data.all = (await handleCategory.getCategoryByFilter()).all;
      break;
  }
  res.json({
    data: res_data,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const cat = await categoryModel.single(id);
  res.json({
    data: cat,
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
