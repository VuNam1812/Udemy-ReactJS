const courseModel = require("../../models/course.model");
const userModel = require("../../models/user.model");
const cateModel = require("../../models/category.model");
const chapterModel = require("../../models/chapter.model");
const lectureModel = require("../../models/lecture.model");

const getCourseByFilter = async (
  getInfo = [],
  filter,
  condition = { isDelete: 0 }
) => {
  let res_data = await courseModel.allWithFilter(filter, condition);
  for (const course of res_data) {
    await getMoreInfoCourse(course, getInfo);
  }

  return res_data;
};

const getCourseBySearchText = async (getInfo, search, filter) => {
  let res_data = await courseModel.bySearchText(search, filter);
  for (const course of res_data[0]) {
    await getMoreInfoCourse(course, getInfo);
  }

  return res_data[0];
};

const getMoreInfoCourse = async (course, info = []) => {
  for (const item_info of info) {
    if (info.length === 0) return;

    switch (item_info) {
      case "teacherName":
        const teacher = await userModel.single(course.id_owner);
        course.teacherName = teacher.name;
        course.teacherId = teacher.id;
        break;

      case "teacherImage":
        const teacherinfo = await userModel.single(course.id_owner);
        course.teacherImage = teacherinfo.srcImage;
        break;

      case "catName":
        const cat = await cateModel.single(course.id_cat);
        course.catName = cat.fullName;
        break;

      case "lectureCount":
        const chapters = await chapterModel.allByCourse(course.id);
        course.lectureCount = chapters.reduce((a, b) => a + b.lectureCount, 0);
        break;

      case "duration":
        const lectures = await lectureModel.allByCourse(course.id);
        course.duration = +lectures.reduce((a, item) => a + item.duration, 0);
        break;

      case "firstLecture":
        await (async () => {
          const lectures = await lectureModel.allByCourse(course.id);
          if (lectures.length !== 0) {
            course.firstLecture = lectures[0].id;
            course.firstLectureName = lectures[0].name;
          } else {
            course.firstLecture = -1;
            course.firstLectureName = "empty";
          }
        })();
        break;
      default:
        break;
    }
  }
};

module.exports = {
  getCourseByFilter: getCourseByFilter,
  getMoreInfoCourse: getMoreInfoCourse,
  getCourseBySearchText: getCourseBySearchText,
};
