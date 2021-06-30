const db = require('../utils/db');

const TBL_CATEGORIES = 'categories';

module.exports = {
  all() {
    return db(TBL_CATEGORIES);
  },

  async single(id) {
    const users = await db(TBL_CATEGORIES).where("id", id);

    if (users.length === 0) {
      return null;
    }

    return users[0];
  },
};
