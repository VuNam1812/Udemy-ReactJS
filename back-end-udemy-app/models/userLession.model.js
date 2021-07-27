const db = require("../utils/db");

const TBL_USER_LESSION = "user_lession";

module.exports = {
  singleByUserIdAndLectureId: async (userId, lectureId) => {
    const targets = await db(TBL_USER_LESSION).where({
      id_user: userId,
      id_lecture: lectureId,
    });

    if (targets.length === 0) {
      return null;
    }

    return targets[0];
  },

  add(data) {
    return db(TBL_USER_LESSION).insert(data);
  },

  update(id, data) {
    return db(TBL_USER_LESSION)
      .where("id", id)
      .update({ ...data });
  },

  delete(id) {
    return db(TBL_USER_LESSION).where("id", id).del();
  },
};
