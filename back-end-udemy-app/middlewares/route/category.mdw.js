const cateModel = require("../../models/category.model");

const getCategoryByFilter = async (type = "") => {
  let res_data = {};
  switch (type) {
    case "topJoin":
      res_data.topJoin = await cateModel.allWithJoinCount();
      res_data.topJoin = res_data.topJoin
        .map((cat) => {
          if (cat.id_parentCat === 0) {
            cat.joinerCount = +cat.joinerCount + +res_data.topJoin
              .filter((value) => value.id_parentCat === cat.id)
              .reduce((sum, item) => sum + +item.joinerCount, 0);
            return cat;
          }
        })
        .filter((value) => typeof value !== "undefined");
      break;

    default:
      res_data.all = await cateModel.all();
      break;
  }
  return res_data;
};

module.exports = {
  getCategoryByFilter: getCategoryByFilter,
};
