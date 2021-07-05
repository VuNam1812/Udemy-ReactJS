const courseModel = require("../../models/course.model");
const userModel = require("../../models/user.model");
const cateModel = require("../../models/category.model");
const chapterModel = require("../../models/chapter.model");
const lectureModel = require('../../models/lecture.model')

const getCourseByFilter = async (type = "") => {
  let res_data = {};
  switch (type) {
    case "topRate":
      res_data.topRate = await courseModel.allWithFilter("rate", "desc", 5, 0);
      break;
    case "topView":
      res_data.topView = await courseModel.allWithFilter(
        "viewCount",
        "desc",
        10,
        0
      );
      break;
    case "topNew":
      res_data.topNew = await courseModel.allWithFilter("id", "desc", 10, 0);
      break;
    default:
      res_data.all = await courseModel.all();
      break;
  }
  for (const key in res_data) {
    if (Object.hasOwnProperty.call(res_data, key)) {
      const courses = res_data[key];
      for (const course of courses) {
        await getMoreInfoCourse(course, [
          "teacherName",
          "catName",
          "lectureCount",
          'duration'
        ]);
      }
    }
  }


  return res_data;
};

const getMoreInfoCourse = async (course, info = []) => {
  for (const item_info of info) {
    if (info.length === 0) return;

    switch (item_info) {
      case "teacherName":
        const teacher = await userModel.single(course.id_owner);
        course.teacherName = `${teacher.firstName} ${teacher.lastName}`;
        break;

      case "catName":
        const cat = await cateModel.single(course.id_cat);
        course.catName = cat.fullName;
        break;
      case "lectureCount":
        const chapters = await chapterModel.allByCourse(course.id);
        course.lectureCount = chapters.reduce((a, b) => a + b.lectureCount, 0);
        break;
      case 'duration':
        const lectures = await lectureModel.allByCourse(course.id);
        course.duration = +lectures.reduce((a, item) => a + item.duration, 0)
      default:
        break;
    }
  }
};

module.exports = {
  getCourseByFilter: getCourseByFilter,
};
