const db = require("../utils/db");

const TBL_COURSES = "courses";

module.exports = {
  all() {
    return db(TBL_COURSES);
  },

  allWithFilter(filter, condition = { isDelete: 0 }) {
    return db(TBL_COURSES)
      .where({ ...condition })
      .orderBy(filter.order, filter.sort)
      .limit(filter.limit)
      .offset(filter.offset);
  },

  allWithCatId(id, order = "id", sort = "asc", limit = 1000000000, offset = 0) {
    return db(TBL_COURSES)
      .where("isDelete", 0)
      .where("id_cat", id)
      .orderBy(order, sort)
      .limit(limit)
      .offset(offset);
  },

  bySearchText(text, filter) {
    return db(TBL_COURSES)
      .whereRaw(`MATCH(CourName) AGAINST('+${text}' IN BOOLEAN MODE)`)
      .where("isDelete", 0)
      .orderBy(filter.order, filter.sort)
      .limit(filter.limit)
      .offset(filter.offset);
  },

  async single(id) {
    const courses = await db(TBL_COURSES).where("id", id);

    if (courses.length === 0) {
      return null;
    }

    return courses[0];
  },

  async singleBySlug(slug) {
    const courses = await db(TBL_COURSES).where("slug", "LIKE", `%${slug}%`);

    if (courses.length === 0) {
      return null;
    }

    return courses[0];
  },

  singleByOwner(id, filter = {}) {
    return db(TBL_COURSES).where({
      id_owner: id,
      ...filter,
    });
  },

  add(data) {
    return db(TBL_COURSES).insert(data);
  },

  update(id, data) {
    return db(TBL_COURSES)
      .where("id", id)
      .update({ ...data });
  },
};
