const express = require("express");
const fs = require("fs");

const categoryModel = require("../models/category.model");
const courseModel = require("../models/course.model");
const handleCategory = require("../middlewares/route/category.mdw");
const handleCourse = require("../middlewares/route/course.mdw");
const router = express.Router();

const awsService = require("../aws/index");
const auth = require("../middlewares/auth.mdw");

const EmptyImage =
  "https://myedu-1612407.s3.sa-east-1.amazonaws.com/1/CategoryEmptyImage.png";

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
  return res.json({
    data: res_data,
  });
});

router.post("/", auth, async (req, res) => {
  const { permission } = req.accessTokenPayload;

  if (permission !== 0) {
    return res.json({
      data: {
        created: false,
        err_message: "Permission invalid!!",
      },
    });
  }

  try {
    const parentCatName =
      +req.body.id_parentCat === 0
        ? ""
        : (await categoryModel.single(+req.body.id_parentCat)).fullName + " | ";

    const ret = await categoryModel.add({
      ...req.body,
      fullName: `${parentCatName}${req.body.catName}`,
    });

    return res.json({
      data: {
        created: true,
        catId: ret[0],
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

router.get("/:id/can-Delete", auth, async (req, res) => {
  const { id } = req.params;
  const { permission } = req.accessTokenPayload;

  if (permission !== 0) {
    return res.json({
      data: {
        canDelete: false,
        err_message: "Permission invalid!!",
      },
    });
  }

  const cats = await categoryModel.allWithId(id);

  let courses = [];

  for (const cat of cats) {
    courses = [...courses, ...(await courseModel.allWithCatId(cat.id))];
  }

  return res.json({
    data: {
      canDelete: courses.length === 0,
    },
  });
});

router.get("/linkUpload", auth, async (req, res) => {
  const { permission } = req.accessTokenPayload;

  if (permission !== 0) {
    return res.json({
      data: {
        updated: false,
        err_message: "Permission invalid!!",
      },
    });
  }

  const { urlSaveObject, urlGetObject } = await awsService.createLinkUpload(
    req.query
  );

  return res.json({
    data: {
      uri: { urlSaveObject, urlGetObject },
    },
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const cat = await categoryModel.single(id);
  return res.json({
    data: cat,
  });
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { permission } = req.accessTokenPayload;

  if (permission !== 0) {
    return res.json({
      data: {
        updated: false,
        err_message: "Permission invalid!!",
      },
    });
  }

  try {
    const parentCatName =
      +req.body.id_parentCat === 0
        ? ""
        : (await categoryModel.single(+req.body.id_parentCat)).fullName + " | ";

    await categoryModel.update(id, {
      srcImage: EmptyImage,
      ...req.body,
      fullName: parentCatName + req.body.catName,
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

  if (permission !== 0) {
    return res.json({
      data: {
        deleted: false,
        err_message: "Permission invalid!!",
      },
    });
  }

  try {
    const ret = await categoryModel.delete(id);

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

router.get("/:id/courses", async (req, res) => {
  const { id } = req.params;
  const { getInfo } = req.query;
  const cats = await categoryModel.allWithId(id);

  let courses = [];

  for (const cat of cats) {
    courses = [...courses, ...(await courseModel.allWithCatId(cat.id))];
  }

  for (const course of courses) {
    await handleCourse.getMoreInfoCourse(
      course,
      ["lectureCount", "catName", "teacherName"].concat(getInfo)
    );
  }

  return res.json({
    data: [...courses],
  });
});

module.exports = router;
