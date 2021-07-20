const db = require("../utils/db");

const TBL_USERS = "users";

module.exports = {
  all(filter = {}, filterNot = { id: 0 }) {
    return db(TBL_USERS)
      .where({ ...filter })
      .whereNot({ ...filterNot });
  },

  async single(id) {
    const users = await db(TBL_USERS).where("id", id);

    if (users.length === 0) {
      return null;
    }

    return users[0];
  },

  async findByEmail(email, except = {}) {
    const users = await db(TBL_USERS)
      .where("email", email)
      .whereNot({ ...except });
    if (users.length === 0) {
      return null;
    }

    return users[0];
  },

  async add(user) {
    const ids = await db(TBL_USERS).insert(user);
    return ids[0];
  },

  updateRefreshToken(id, refreshToken) {
    return db(TBL_USERS).where("id", id).update("rfToken", refreshToken);
  },

  async isValidRefreshToken(id, refreshToken) {
    const list = await db(TBL_USERS)
      .where("id", id)
      .andWhere("rfToken", refreshToken);
    if (list.length > 0) {
      return true;
    }

    return false;
  },

  update(id, data) {
    return db(TBL_USERS)
      .where("id", id)
      .update({ ...data });
  },
};
