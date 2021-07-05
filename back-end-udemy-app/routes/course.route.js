const { resolveSchema } = require("ajv/dist/compile");
const express = require("express");
const handleCourse = require('../middlewares/route/course.mdw');
const router = express.Router();

const emptyImage = "public/imgs/Users/CourseEmptyImage.jpg";

router.get("/", async (req, res) => {
  const { filter } = req.query;

  let res_data = {};
  switch (typeof filter) {
    case "string":
      res_data[filter] = (await handleCourse.getCourseByFilter(filter))[filter];
      break;
    case "object":
      for (const item of filter) {
        res_data[item] = (await handleCourse.getCourseByFilter(item))[item];
      }
      break;
    default:
      res_data.all = (await handleCourse.getCourseByFilter()).all;
      break;
  }

  res.json({
    data: res_data,
  });
});

module.exports = router;
