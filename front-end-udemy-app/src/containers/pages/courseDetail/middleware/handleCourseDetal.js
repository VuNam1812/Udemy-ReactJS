import courseApi from "../../../../api/courseAPI";
import accountApi from "../../../../api/accountAPI";
import { COURSE_DETAIL_ACTION } from "../reducer/reducer";
export const handleCourseDetail = {
  loadCourse: async (params, dispatch) => {
    const { courId } = params;

    const course = await courseApi.getSingle(courId, {
      getInfo: ["teacherImage", "teacherName"],
    });

    dispatch({
      type: COURSE_DETAIL_ACTION.INIT_DATA,
      payload: {
        course: {
          ...course.data,
        },
      },
    });
  },
  loadTeacher: async (params, dispatch) => {
    const { userId } = params;

    const account = await accountApi.getSingle(userId, {
      getInfo: ["studentCount", "rate", "courseCount", "teacherDesc", "major"],
    });

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_TEACHER,
      payload: {
        teacher: {
          ...account.data,
        },
      },
    });
  },
  loadLectures: async (params, dispatch) => {
    const { courId } = params;

    const chapters = await courseApi.getLessions(courId);

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_LESSION,
      payload: {
        lectures: [...chapters.data],
      },
    });
  },
  loadFeedbacks: async (params, dispatch) => {
    const { courId } = params;

    const feedbacks = await courseApi.getFeedbacks(courId);

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_FEEDBACK,
      payload: {
        feedbacks: { ...feedbacks.data },
      },
    });
  },
};
