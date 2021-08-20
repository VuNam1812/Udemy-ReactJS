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
    if (filter.order === "id") {
      filter.order = "score";
      filter.sort = "desc";
    }
    return db.raw(`
      SELECT courses.*, MATCH (courses.courName,courses.fullDes) AGAINST ('+${text}' IN NATURAL LANGUAGE MODE) as score
      FROM courses join categories on courses.id_cat = categories.id
      where courses.isDelete = 0 and MATCH (courName,fullDes) AGAINST ('+${text}' IN NATURAL LANGUAGE MODE) or 
        MATCH (fullName) AGAINST ('+${text}' IN NATURAL LANGUAGE MODE)
      ORDER BY ${filter.order} ${filter.sort}
      LIMIT ${filter.limit} OFFSET ${filter.offset}
      `);
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
