const db = require("../utils/db");

const TBL_JOININCOURSES = "joinincourses";

module.exports = {
  all() {
    return db(TBL_JOININCOURSES);
  },

  allByUser(id) {
    return db(TBL_JOININCOURSES)
      .join("courses", "courses.id", `${TBL_JOININCOURSES}.id_course`)
      .whereRaw(`${TBL_JOININCOURSES}.id_user = ${id}`)
      .whereRaw(`${TBL_JOININCOURSES}.isDelete = 0`)
      .select(`courses.*`, `${TBL_JOININCOURSES}.createAt as payAt`);
  },

  async singleByIdUserAndCourse(id_user, id_course) {
    const joiners = await db(TBL_JOININCOURSES)
      .where("id_user", id_user)
      .where("id_course", id_course)
      .where("isDelete", 0);

    if (joiners.length === 0) {
      return null;
    }

    return joiners[0];
  },

  async single(id) {
    const joiners = await db(TBL_JOININCOURSES).where("id", id);

    if (joiners.length === 0) {
      return null;
    }

    return joiners[0];
  },

  add(payment) {
    return db(TBL_JOININCOURSES).insert(payment);
  },
};
