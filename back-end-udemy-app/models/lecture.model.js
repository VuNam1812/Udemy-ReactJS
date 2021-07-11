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
    return db(TBL_LECTURES).where("id_chapter", id);
  },

  async single(id) {
    const chaptes = await db(TBL_LECTURES).where("id", id);

    if (chaptes.length === 0) {
      return null;
    }

    return chaptes[0];
  },
};
