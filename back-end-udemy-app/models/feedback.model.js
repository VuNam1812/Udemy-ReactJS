const db = require("../utils/db");

const TBL_FEEDBACKS = "feedback";

module.exports = {
  all() {
    return db(TBL_FEEDBACKS);
  },

  allWithCourseId(id) {
    return db(TBL_FEEDBACKS).where("id_course", id).orderBy('createAt');
  },

  allWithUserOwnerCourse(id) {
    return db(TBL_FEEDBACKS)
      .join("courses", "courses.id", `${TBL_FEEDBACKS}.id_course`)
      .where("courses.id_owner", id);
  },

  async single(id) {
    const feedback = await db(TBL_FEEDBACKS).where("id", id);

    if (feedback.length === 0) {
      return null;
    }

    return feedback[0];
  },

  add(data) {
    return db(TBL_FEEDBACKS).insert({ ...data });
  },
};
