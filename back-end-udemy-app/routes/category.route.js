const express = require("express");
const fs = require("fs");

const categoryModel = require("../models/category.model");
const courseModel = require("../models/course.model");
const handleCategory = require("../middlewares/route/category.mdw");
const handleCourse = require("../middlewares/route/course.mdw");
const router = express.Router();

const auth = require("../middlewares/auth.mdw");

const upload = require("../middlewares/multer.mdw").UploadCategories();

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
  return res.json({
    data: res_data,
  });
});

router.post("/", auth, upload.single("srcImage"), async (req, res) => {
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
      srcImage: req.file ? req.file.path : EmptyImage,
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const cat = await categoryModel.single(id);
  return res.json({
    data: cat,
  });
});

router.patch("/:id", auth, upload.single("srcImage"), async (req, res) => {
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

    if (req.file?.path) {
      const oldPath = (await categoryModel.single(id)).srcImage;
      if (oldPath !== EmptyImage && req.file.path !== oldPath) {
        if (fs.existsSync(oldPath.replace("\\/g", "/"))) {
          fs.unlink(oldPath.replace("\\/g", "/"), () => {});
        }
      }
    }

    await categoryModel.update(id, {
      ...req.body,
      srcImage: req.file ? req.file.path : req.body.srcImage,
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
    const catImage = (await categoryModel.single(id)).srcImage;

    const ret = await categoryModel.delete(id);
    if (
      catImage !== EmptyImage &&
      fs.existsSync(catImage.replace("\\/g", "/") && ret)
    ) {
      fs.unlink(catImage.replace("\\/g", "/"), () => {});
    }

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
