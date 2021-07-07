const express = require("express");
const handleCourse = require("../middlewares/route/course.mdw");
const handleAccount = require('../middlewares/route/account.mdw');

const chapterModel = require("../models/chapter.model");
const courseModel = require("../models/course.model");
const lectureModel = require("../models/lecture.model");
const feedbackModel = require("../models/feedback.model");

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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { getInfo } = req.query;
  const course = await courseModel.single(id);

  await handleCourse.getMoreInfoCourse(
    course,
    ["duration", "catName"].concat(getInfo)
  );

  res.json({
    data: course,
  });
});

router.get("/:id/lessions", async (req, res) => {
  const { id } = req.params;
  const chapters = await chapterModel.allByCourse(id);

  for (const chapter of chapters) {
    chapter["lectures"] = await lectureModel.allByChapter(chapter.id);
  }

  res.json({
    data: chapters,
  });
});

router.get("/:id/feedbacks", async (req, res) => {
  const { id } = req.params;
  const feedbacks = await feedbackModel.allWithCourseId(id);
  for (const feedback of feedbacks) {
    feedback.user = await handleAccount.getBasicInfoAccount(feedback.id_user);
  }
  let course = {
    feedbacks,
    rate: []
  }

  for (let index = 1; index <= 5; index++) {
    const count = feedbacks.reduce(
      (a, b) => a + ((b.rate === index) ? 1 : 0),
      0
    );
    course.rate = [
      ...course.rate,
      {
        count: count,
        percent: feedbacks.length === 0 ? 0 : Math.round((count / feedbacks.length) * 100),
      },
    ];
  }

  res.json({
    data: course,
  });
});

module.exports = router;
