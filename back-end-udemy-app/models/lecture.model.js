const db = require("../utils/db");

const TBL_LECTURES = "lectures";

module.exports = {
  all() {
    return db(TBL_LECTURES);
  },

  allByCourse(id) {
    return db(TBL_LECTURES)
      .join("chapters", `${TBL_LECTURES}.id_chapter`, "chapters.id")
      .join("courses", `chapters.id_course`, "courses.id")
      .where("courses.id", id)
      .select(`${TBL_LECTURES}.*`)
      .select(`courses.id as id_course`);
  },

  allByChapter(id) {
    return db(TBL_LECTURES).where("id_chapter", id).orderBy("id", "asc");
  },

  async single(id) {
    const lectures = await db(TBL_LECTURES).where("id", id);

    if (lectures.length === 0) {
      return null;
    }

    return lectures[0];
  },

  async singleBySlug(slug) {
    const lectures = await db(TBL_LECTURES).where("slug", "LIKE", `%${slug}%`);

    if (lectures.length === 0) {
      return null;
    }

    return lectures[0];
  },

  add(data) {
    return db(TBL_LECTURES).insert(data);
  },

  update(id, data) {
    return db(TBL_LECTURES)
      .where("id", id)
      .update({ ...data });
  },

  delete(id) {
    return db(TBL_LECTURES).where("id", id).del();
  },
};
