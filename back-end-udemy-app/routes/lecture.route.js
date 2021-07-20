const express = require("express");

const lectureModel = require("../models/lecture.model");
const chapterModel = require("../models/chapter.model");

const awsService = require("../aws/index");

const router = express.Router();

const auth = require("../middlewares/auth.mdw");

router.get("/", async (req, res) => {
  return res.json({
    data: [],
  });
});

router.post("/", auth, async (req, res) => {
  const { permission } = req.accessTokenPayload;

  if (permission !== 1) {
    return res.json({
      data: {
        created: false,
        err_message: "permission invalid",
      },
    });
  }
  try {
    const ret = await lectureModel.add({
      ...req.body,
    });

    const chapter = await chapterModel.single(req.body.id_chapter);

    await chapterModel.update(req.body.id_chapter, {
      lectureCount: chapter.lectureCount + 1,
    });

    return res.json({
      data: {
        created: true,
      },
    });
  } catch (error) {
    return res.json({
      data: {
        created: false,
      },
    });
  }
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
    "lessions"
  );

  return res.json({
    data: {
      uri: { urlSaveObject, urlGetObject },
    },
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const lecture = await lectureModel.single(id);
  return res.json({
    data: lecture,
  });
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { permission } = req.accessTokenPayload;

  if (permission !== 1) {
    return res.json({
      data: {
        updated: false,
        err_message: "permission invalid",
      },
    });
  }
  try {
    const ret = await lectureModel.update(id, {
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
      },
    });
  }
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

  return res.json({
    data: [...courses],
  });
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { permission } = req.accessTokenPayload;

  if (permission !== 1) {
    return res.json({
      data: {
        deleted: false,
        err_message: "permission invalid",
      },
    });
  }

  try {
    const { id_chapter } = await lectureModel.single(id);
    const ret = await lectureModel.delete(id);

    const chapter = await chapterModel.single(id_chapter);

    await chapterModel.update(chapter.id, {
      lectureCount: chapter.lectureCount - 1,
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

module.exports = router;
