const express = require("express");
const slugify = require("slugify");
const router = express.Router();

const lectureModel = require("../models/lecture.model");
const chapterModel = require("../models/chapter.model");

const awsService = require("../aws/index");
const auth = require("../middlewares/auth.mdw");
const validate = require('../middlewares/validate.mdw');

const lectureSchema = require('../schemas/lecture.json');

const configSlug = (name) => {
  return slugify(name, {
    locale: "vi",
    lower: true,
  });
};

router.get("/", async (req, res) => {
  return res.json({
    data: [],
  });
});

router.post("/", validate(lectureSchema), auth, async (req, res) => {
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
      slug: configSlug(req.body.name),
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
  const { bySlug } = req.query;
  const lecture = bySlug !== 'true' ? await lectureModel.single(id) : await lectureModel.singleBySlug(id);
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
      slug: configSlug(req.body.name),
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
