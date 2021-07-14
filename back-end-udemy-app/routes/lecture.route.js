const express = require("express");
const fs = require("fs");

const lectureModel = require("../models/lecture.model");
const chapterModel = require("../models/chapter.model");

const router = express.Router();

const auth = require("../middlewares/auth.mdw");

const upload = require("../middlewares/multer.mdw").UploadVideoLecture();

const EmptyImage = "public/imgs/Categories/CategoryEmptyImage.png";

router.get("/", async (req, res) => {
  return res.json({
    data: [],
  });
});

router.post("/", auth, upload.single("src"), async (req, res) => {
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
      src: req.file ? req.file.path : "",
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const lecture = await lectureModel.single(id);
  res.json({
    data: lecture,
  });
});

router.patch("/:id", auth, upload.single("src"), async (req, res) => {
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
    if (req.file.path) {
      const oldPath = (await lectureModel.single(id)).src;
      if (oldPath.length !== 0 && req.file.path !== oldPath) {
        fs.unlink(oldPath.replace("\\/g", "/"), () => {});
      }
    }

    const ret = await lectureModel.update(id, {
      ...req.body,
      src: req.file ? req.file.path : req.body.src,
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

  res.json({
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
    const { src: oldPath, id_chapter } = await lectureModel.single(id);
    const ret = await lectureModel.delete(id);

    if (ret && oldPath.length !== 0) {
      if (fs.existsSync(oldPath.replace("\\/g", "/"))) {
        fs.unlink(oldPath.replace("\\/g", "/"), () => {});
      }
    }

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
