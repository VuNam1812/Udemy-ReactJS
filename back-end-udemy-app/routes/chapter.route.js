const express = require("express");

const chapterModel = require("../models/chapter.model");

const router = express.Router();

const auth = require("../middlewares/auth.mdw");
const lectureModel = require("../models/lecture.model");

//const upload = require('../../middlewares/multer.mdw').UploadUser();

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
    const ret = await chapterModel.add({
      ...req.body,
      lectureCount: 0,
    });
    return res.json({
      data: {
        created: true,
        chapterId: ret,
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

  const chapter = await chapterModel.single(id);

  chapter["lectures"] = await lectureModel.allByChapter(id);

  return res.json({
    data: chapter,
  });
});

router.patch('/:id', auth, async (req, res) => {
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
    await chapterModel.update(+id, {
      ...req.body
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
})

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
    await chapterModel.delete(+id);
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
