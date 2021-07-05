const db = require('../utils/db');

const TBL_CATEGORIES = 'categories';

module.exports = {
  all() {
    return db(TBL_CATEGORIES);
  },

  allWithJoinCount() {
    return db(TBL_CATEGORIES)
      .join("courses", "courses.id_cat", `${TBL_CATEGORIES}.id`)
      .groupByRaw(`${TBL_CATEGORIES}.id, ${TBL_CATEGORIES}.id_parentCat`)
      .sum("courses.joinerCount as joinerCount")
      .select(`${TBL_CATEGORIES}.*`);
  },

  async single(id) {
    const users = await db(TBL_CATEGORIES).where("id", id);

    if (users.length === 0) {
      return null;
    }

    return users[0];
  },
};
