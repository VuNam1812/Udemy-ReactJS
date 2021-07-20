const db = require("../utils/db");

const TBL_TEACHER_INFOS = "teacherinfo";

module.exports = {
  all() {
    return db(TBL_TEACHER_INFOS);
  },

  async singleByTeacherId(id) {
    const infos = await db(TBL_TEACHER_INFOS).where("id_user", id);

    if (infos.length === 0) {
      return null;
    }

    return infos[0];
  },

  add(data) {
    return db(TBL_TEACHER_INFOS).insert({ ...data });
  },

  update(id, data) {
    return db(TBL_TEACHER_INFOS)
      .where("id_user", id)
      .update({ ...data });
  },
};
