const db = require('../utils/db');

const TBL_COURSES = 'courses';

module.exports = {
  all() {
    return db(TBL_COURSES);
  },

  allWithFilter(by = 'id', sort = 'desc', limit = 0, offset = 0) {
    return db(TBL_COURSES).where('isDelete', 0).orderBy(by, sort).limit(limit).offset(offset)
  },
  
  

  async single(id) {
    const courses = await db(TBL_COURSES).where("id", id);

    if (courses.length === 0) {
      return null;
    }

    return courses[0];
  },
};