const express = require("express");
const fs = require("fs");
const moment = require("moment");

const handleCourse = require("../middlewares/route/course.mdw");
const handleAccount = require("../middlewares/route/account.mdw");
const upload = require("../middlewares/multer.mdw").UploadCourses();

const chapterModel = require("../models/chapter.model");
const courseModel = require("../models/course.model");
const joinModel = require("../models/joinInCourse.model");
const lectureModel = require("../models/lecture.model");
const feedbackModel = require("../models/feedback.model");
const favoriteCourseModel = require("../models/favoriteCourse.model");

const auth = require("../middlewares/auth.mdw");
const joinInCourseModel = require("../models/joinInCourse.model");

const router = express.Router();

const emptyImage = "public/imgs/Courses/CourseEmptyImage.png";

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

  return res.json({
    data: res_data,
  });
});

router.post("/", auth, async (req, res) => {
  const { permission, userId } = req.accessTokenPayload;

  if (permission !== 1) {
    return res.json({
      data: {
        created: false,
        err_message: "account permission cannot create course.",
      },
    });
  }

  const newCourse = {
    ...req.body,
    id_owner: +userId,
    srcImage: emptyImage,
    createAt: moment(new Date()).format("YYYY-MM-DD"),
    lastUpdate: moment(new Date()).format("YYYY-MM-DD"),
    joinerCount: 0,
    feedbackCount: 0,
    tinyDes: "",
    fullDes: "",
    isDelete: 0,
    isAds: 0,
    viewCount: 0,
    status: 0,
  };
  try {
    const ret = await courseModel.add(newCourse);
    return res.json({
      data: {
        created: true,
      },
    });
  } catch (error) {
    return res.json({
      data: {
        created: false,
        err_message: "update failed!!",
      },
    });
  }
});

router.get("/payment", auth, async (req, res) => {
  const { courId } = req.query;
  const { userId } = req.accessTokenPayload;
  const pay = await joinInCourseModel.singleByIdUserAndCourse(+userId, +courId);

  return res.json({
    data: {
      paid: pay !== null,
    },
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

  return res.json({
    data: course,
  });
});

router.put(
  "/:id/uploadImage",
  auth,
  upload.single("srcImage"),
  async (req, res) => {
    const { id } = req.params;
    let { currentSrc } = req.body;
    const { permission } = req.accessTokenPayload;

    if (permission !== 1) {
      return res.json({
        data: {
          updated: false,
          err_message: "Permission invalid!!",
        },
      });
    }

    const result = await courseModel.update(id, {
      srcImage: req.file.path,
      lastUpdate: moment(new Date()).format("YYYY-MM-DD"),
    });

    if (result) {
      currentSrc = currentSrc.replace("\\/g", "/");
      if (currentSrc !== emptyImage) {
        fs.unlink(currentSrc, () => {});
      }
    }

    return res.json({
      data: {
        updated: true,
        srcImage: req.file.path,
      },
    });
  }
);

router.post("/:id/payment", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;

  const payment = {
    id_user: +userId,
    id_course: +id,
    isDelete: +0,
    createAt: moment(new Date()).format("YYYY-MM-DD h:mm:ss"),
  };

  try {
    const ret = await joinModel.add(payment);

    await courseModel.update(+id, {
      joinerCount: (await courseModel.single(+id)).joinerCount + 1,
    });

    const favorites = await favoriteCourseModel.allByUser(+userId);

    await favoriteCourseModel.update(
      favorites.filter((value) => value.id === +id)[0].id_favorite,
      {
        isDelete: 1,
      }
    );

    res.json({
      data: {
        result: true,
      },
    });
  } catch (error) {
    res.json({
      data: {
        result: true,
      },
    });
  }
});

router.get("/:id/lessions", async (req, res) => {
  const { id } = req.params;
  const chapters = await chapterModel.allByCourse(id);

  for (const chapter of chapters) {
    chapter["lectures"] = await lectureModel.allByChapter(chapter.id);
  }

  return res.json({
    data: chapters,
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

router.get("/:id/feedbacks", async (req, res) => {
  const { id } = req.params;
  const feedbacks = await feedbackModel.allWithCourseId(id);
  for (const feedback of feedbacks) {
    feedback.user = await handleAccount.getBasicInfoAccount(feedback.id_user);
  }
  let course = {
    feedbacks,
    rate: [],
  };

  for (let index = 1; index <= 5; index++) {
    const count = feedbacks.reduce((a, b) => a + (b.rate === index ? 1 : 0), 0);
    course.rate = [
      ...course.rate,
      {
        count: count,
        percent:
          feedbacks.length === 0
            ? 0
            : Math.round((count / feedbacks.length) * 100),
      },
    ];
  }

  return res.json({
    data: course,
  });
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { userId, permission } = req.accessTokenPayload;

  const course = await courseModel.single(id);

  if (+course.id_owner !== +userId || +permission !== 1) {
    return res.json({
      data: {
        updated: false,
        err_message: "permission invalid",
      },
    });
  }

  try {
    const ret = await courseModel.update(id, {
      ...req.body,
      lastUpdate: moment(new Date()).format("YYYY-MM-DD"),
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

module.exports = router;
