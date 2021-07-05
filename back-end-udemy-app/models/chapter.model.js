const db = require("../utils/db");

const TBL_CHAPTERS = "chapters";

module.exports = {
  all() {
    return db(TBL_CHAPTERS);
  },

  allByCourse(id) {
    return db(TBL_CHAPTERS).where("id_course", id);
  },

  async single(id) {
    const chaptes = await db(TBL_CHAPTERS).where("id", id);

    if (chaptes.length === 0) {
      return null;
    }

    return chaptes[0];
  },
};
