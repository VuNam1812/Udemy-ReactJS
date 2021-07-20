const db = require("../utils/db");

const TBL_FAVORITELIST = "favoritelist";

module.exports = {
  all() {
    return db(TBL_FAVORITELIST);
  },

  allByUser(id) {
    return db(TBL_FAVORITELIST)
      .join("courses", "courses.id", `${TBL_FAVORITELIST}.id_course`)
      .whereRaw(`${TBL_FAVORITELIST}.id_user = ${id}`)
      .whereRaw(`${TBL_FAVORITELIST}.isDelete = 0`)
      .select(`courses.*`)
      .select(`${TBL_FAVORITELIST}.id as id_favorite`);
  },

  async single(filter = {}) {
    const chaptes = await db(TBL_FAVORITELIST).where({
      ...filter,
      isDelete: 0,
    });

    if (chaptes.length === 0) {
      return null;
    }

    return chaptes[0];
  },

  update(id, data) {
    return db(TBL_FAVORITELIST)
      .where("id", id)
      .update({ ...data });
  },

  add(data) {
    return db(TBL_FAVORITELIST).insert({ ...data });
  },
};
