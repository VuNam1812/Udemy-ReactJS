const db = require("../utils/db");

const TBL_CATEGORIES = "categories";

module.exports = {
  all() {
    return db(TBL_CATEGORIES);
  },

  allWithJoinCount() {
    return db(TBL_CATEGORIES)
      .join("courses", "courses.id_cat", `${TBL_CATEGORIES}.id`)
      .groupByRaw(`${TBL_CATEGORIES}.id, ${TBL_CATEGORIES}.id_parentCat`)
      .sum("courses.joinerCount as joinerCount")
      .select(`${TBL_CATEGORIES}.*`);
  },

  allWithId(id) {
    return db(TBL_CATEGORIES)
      .where(`${TBL_CATEGORIES}.id`, id)
      .orWhere(`${TBL_CATEGORIES}.id_parentCat`, id);
  },

  async singleByCatName(name) {
    const cats = await db(TBL_CATEGORIES).where("catName", `N'%${name}%'`);

    if (cats.length === 0) {
      return null;
    }

    return cats[0];
  },

  async single(id) {
    const cats = await db(TBL_CATEGORIES).where("id", id);

    if (cats.length === 0) {
      return null;
    }

    return cats[0];
  },

  add(data) {
    return db(TBL_CATEGORIES).insert({ ...data });
  },

  update(id, data) {
    return db(TBL_CATEGORIES)
      .where("id", id)
      .update({ ...data });
  },

  delete(id) {
    return db(TBL_CATEGORIES).where("id", id).del();
  },
};
