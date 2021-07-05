const express = require("express");
const categoryModel = require("../models/category.model");
const handleCategory = require('../middlewares/route/category.mdw');
const router = express.Router();

//const authMdw = require("../../middlewares/auth.mdw");

//const upload = require('../../middlewares/multer.mdw').UploadUser();
const EmptyImage = "public/imgs/Categories/CategoryEmptyImage.png";

router.get("/", async (req, res) => {
  const { filter } = req.query;

  let res_data = {}
  switch (typeof filter) {
    case 'string':
      res_data[filter] = (await handleCategory.getCategoryByFilter(filter))[filter];
      break;
  
    default:
      res_data.all = (await handleCategory.getCategoryByFilter()).all;
      break;
  }
  res.json({
    data: res_data,
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
