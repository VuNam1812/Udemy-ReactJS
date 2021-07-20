const courseModel = require("../../models/course.model");
const userModel = require("../../models/user.model");
const cateModel = require("../../models/category.model");
const chapterModel = require("../../models/chapter.model");
const lectureModel = require("../../models/lecture.model");
const feedbackModel = require("../../models/feedback.model");
const teacherInfo = require("../../models/teacherinfo.model");
const joinInCourseModal = require("../../models/joinInCourse.model");

const getMoreInfoAccount = async (teacher, info = []) => {
  for (const item_info of info) {
    if (info.length === 0) return;
    switch (item_info) {
      case "studentCount":
        await (async () => {
          let courses = await courseModel.singleByOwner(teacher.id);
          teacher.studentCount = courses.reduce((a, b) => a + b.joinerCount, 0);
        })();
        break;

      case "rate":
        await (async () => {
          let feedbacks = await feedbackModel.allWithUserOwnerCourse(
            teacher.id
          );
          let rate =
            feedbacks.length !== 0
              ? feedbacks.reduce((a, b) => a + b.rate, 0) / feedbacks.length
              : 0;

          teacher.rate = Math.round(rate * 10) / 10;
          teacher.feedbackCount = feedbacks.length;
        })();

        break;

      case "courseCount":
        await (async () => {
          let courses = await courseModel.singleByOwner(teacher.id);
          teacher.courseCount = courses.length;
        })();
        break;

      case "teacherDesc":
        await (async () => {
          const info = await teacherInfo.singleByTeacherId(teacher.id);
          teacher.teacherDesc = info ? info.teacherDesc : "";
        })();
        break;

      case "techniques":
        await (async () => {
          const info = await teacherInfo.singleByTeacherId(teacher.id);
          teacher.techniques = info ? info.techniques : "";
        })();
        break;

      case "major":
        await (async () => {
          const info = await teacherInfo.singleByTeacherId(teacher.id);
          teacher.major = info ? info.major : "";
        })();
        break;

      case "paidCourseCount":
        await (async () => {
          const paid = await joinInCourseModal.allByUser(teacher.id);
          
          teacher.paidCourseCount = paid ? paid.length : 0;
        })();
        break;
      default:
        break;
    }
  }
};

const getBasicInfoAccount = async (id, info = []) => {
  const user = await userModel.single(id);

  ["password", "rfToken", "permission", "email"].map((item) => {
    delete user[item];
  });

  return user;
};

module.exports = {
  getMoreInfoAccount: getMoreInfoAccount,
  getBasicInfoAccount: getBasicInfoAccount,
};
