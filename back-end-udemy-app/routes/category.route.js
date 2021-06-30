const express = require("express");
const categoryModel = require("../models/category.model");

const router = express.Router();

//const authMdw = require("../../middlewares/auth.mdw");

//const upload = require('../../middlewares/multer.mdw').UploadUser();
const EmptyImage = "public/imgs/Categories/CategoryEmptyImage.png";

router.get("/", async (req, res) => {
  const allCat = await categoryModel.all();

  res.json({
    data: [...allCat],
  });
});

router.get("/:id", async (req, res) => {
  const { catId } = req.params.id;
  const cat = await categoryModel.single(catId);

  res.json({
    data: [cat],
  });
});

module.exports = router;
