const express = require("express");
const fs = require("fs");
const moment = require("moment");
const slugify = require("slugify");

const handleCourse = require("../middlewares/route/course.mdw");
const handleAccount = require("../middlewares/route/account.mdw");
const awsService = require("../aws/index");
const validate = require("../middlewares/validate.mdw");

const chapterModel = require("../models/chapter.model");
const courseModel = require("../models/course.model");
const joinModel = require("../models/joinInCourse.model");
const lectureModel = require("../models/lecture.model");
const feedbackModel = require("../models/feedback.model");
const favoriteCourseModel = require("../models/favoriteCourse.model");

const auth = require("../middlewares/auth.mdw");
const joinInCourseModel = require("../models/joinInCourse.model");
const userLessionModel = require("../models/userLession.model");

const courseSchema = require("../schemas/course.json");
const feedbackSchema = require("../schemas/feedback.json");

const router = express.Router();

const configSlug = (url) => {
  return slugify(url, {
    locale: "vi",
    lower: true,
  });
};

const emptyImage =
  "https://myedu-1612407.s3.sa-east-1.amazonaws.com/empty/CourseEmptyImage.png";

router.get("/", async (req, res) => {
  const { getInfo, isDelete, search, order, sort, limit, page } = req.query;

  let res_data = {};
  const filter = {
    order: order || "id",
    sort: sort || "asc",
    limit,
    offset: (+page - 1) * +limit || 0,
  };
  const condition = +isDelete !== -1 ? { isDelete: +isDelete || 0 } : {};

  if (!search) {
    res_data.courses = await handleCourse.getCourseByFilter(
      [].concat(getInfo),
      filter,
      condition
    );
    res_data.length = (
      await courseModel.allWithFilter(
        { ...filter, limit: 1000000000, offset: 0 },
        condition
      )
    ).length;
  } else {
    res_data.courses = await handleCourse.getCourseBySearchText(
      [].concat(getInfo),
      search,
      filter
    );
    res_data.length = (
      await courseModel.bySearchText(search, { ...filter, limit: 1000000000 })
    )[0].length;
  }

  return res.json({
    data: res_data,
  });
});

router.post("/", validate(courseSchema), auth, async (req, res) => {
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
    rate: 5,
    tinyDes: "",
    fullDes: "",
    isDelete: 0,
    isAds: 0,
    viewCount: 0,
    status: 0,
    slug: configSlug(req.body.courName),
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
  const { courId, slug, bySlug } = req.query;
  const { userId } = req.accessTokenPayload;

  const course = bySlug === "true" ? await courseModel.singleBySlug(slug) : {};

  const pay = await joinInCourseModel.singleByIdUserAndCourse(
    +userId,
    bySlug !== "true" ? +courId : +course.id
  );
  return res.json({
    data: {
      paid: pay !== null,
    },
  });
});

router.get("/linkUpload", auth, async (req, res) => {
  const { permission } = req.accessTokenPayload;

  if (permission !== 1) {
    return res.json({
      data: {
        updated: false,
        err_message: "Permission invalid!!",
      },
    });
  }

  const { urlSaveObject, urlGetObject } = await awsService.createLinkUpload(
    req.query,
    "courses"
  );

  return res.json({
    data: {
      uri: { urlSaveObject, urlGetObject },
    },
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { getInfo, bySlug } = req.query;
  const course =
    bySlug !== "true"
      ? await courseModel.single(id)
      : await courseModel.singleBySlug(id);

  await handleCourse.getMoreInfoCourse(
    course,
    ["duration", "catName"].concat(getInfo)
  );

  return res.json({
    data: course,
  });
});

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

router.get("/:id/userlessions", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;

  const chapters = await chapterModel.allByCourse(id);

  for (const chapter of chapters) {
    chapter.lectureCompleted = 0;
    chapter["lectures"] = await lectureModel.allByChapter(chapter.id);
    for (const lecture of chapter["lectures"]) {
      const userLession = await userLessionModel.singleByUserIdAndLectureId(
        userId,
        lecture.id
      );
      lecture.isCompleted = userLession?.isCompleted || 0;
      chapter.lectureCompleted += lecture.isCompleted;
      lecture.lastSeconds = userLession?.lastSeconds || 0;
    }
  }

  return res.json({
    data: chapters,
  });
});

router.post("/:id/favorite", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;

  const ret = await favoriteCourseModel.add({
    id_user: userId,
    id_course: id,
    isDelete: 0,
  });

  return res.json({
    data: {
      created: true,
    },
  });
});

router.delete("/:id/favorite", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;

  try {
    const ret = await favoriteCourseModel.single({
      id_user: +userId,
      id_course: +id,
    });

    await favoriteCourseModel.update(ret.id, {
      isDelete: 1,
    });

    return res.json({
      data: {
        deleted: true,
      },
    });
  } catch (error) {
    return res.json({
      data: {
        deleted: false,
      },
    });
  }
});

router.get("/:id/feedbacks", async (req, res) => {
  const { id } = req.params;
  const { limit, page, order, sort } = req.query;
  const filter = {
    order: order || "createAt",
    sort: sort || "asc",
    limit,
    offset: (+page - 1) * limit || 0,
  };
  const feedbacksGet = await feedbackModel.allWithCourseId(id, filter);
  const feedbackAll = await feedbackModel.allWithCourseId(id, {
    ...filter,
    limit: 1000000000,
    offset: 0,
  });

  for (const feedback of feedbacksGet) {
    feedback.user = await handleAccount.getBasicInfoAccount(feedback.id_user);
  }

  let course = {
    feedbacks: feedbacksGet,
    rate: [],
    length: feedbackAll.length,
  };

  for (let index = 1; index <= 5; index++) {
    const count = feedbackAll.reduce(
      (a, b) => a + (b.rate === index ? 1 : 0),
      0
    );
    course.rate = [
      ...course.rate,
      {
        count: count,
        percent:
          feedbackAll.length === 0
            ? 0
            : Math.round((count / feedbackAll.length) * 100),
      },
    ];
  }

  return res.json({
    data: course,
  });
});

router.post(
  "/:id/feedbacks",
  validate(feedbackSchema),
  auth,
  async (req, res) => {
    const { id } = req.params;
    const { userId } = req.accessTokenPayload;

    try {
      const filter = {
        order: "createAt",
        sort: "desc",
        limit: 1000000000,
        offset: 0,
      };
      const ret = await feedbackModel.add({
        id_course: id,
        id_user: userId,
        ...req.body,
        createAt: moment(new Date()).format("YYYY-MM-DD"),
      });

      const feedbackCount = (await courseModel.single(id)).feedbackCount;
      const feedbacks = await feedbackModel.allWithCourseId(id, filter);

      const rate =
        feedbacks.reduce((sum, value) => sum + +value.rate, 0) /
        feedbacks.length;

      await courseModel.update(id, {
        feedbackCount: feedbackCount + 1,
        rate: Math.round(rate * 10) / 10,
      });

      return res.json({
        data: {
          created: true,
          id_feedback: ret,
        },
      });
    } catch (error) {
      return res.json({
        data: {
          created: false,
        },
      });
    }
  }
);

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

  delete req.body.isDelete;

  try {
    const ret = await courseModel.update(id, {
      ...req.body,
      slug: configSlug(req.body.courName || course.courName),
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

router.patch("/:id/views", async (req, res) => {
  const { id } = req.params;

  try {
    await courseModel.update(id, {
      viewCount: req.body.viewCount,
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
    const ret = await courseModel.update(id, {
      isDelete: req.body.isDelete,
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
