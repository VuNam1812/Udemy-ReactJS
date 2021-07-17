import accountApi from "../../../../api/accountAPI";
import courseApi from "../../../../api/courseAPI";
import { STUDENT_PROFILE_ACTION } from "../reducer/reducer";
import { AUTH_ACTION } from "../../../../contexts/auth/reducer";
export const handleStudentProfile = {
  loadProfile: async (data, dispatch) => {
    const { accountId } = data;

    const account = (await accountApi.getSingle(accountId)).data;

    account.role = "Học viên";

    dispatch({
      type: STUDENT_PROFILE_ACTION.INIT_DATA,
      payload: {
        ...account,
      },
    });
  },

  loadCourseJoin: async (data, dispatch) => {
    const { accountId } = data;

    const courses = await accountApi.getCourseJoin(accountId, {
      getInfo: ["lectureCount", "teacherName", "firstLecture"],
    });

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_COURSE_JOIN,
      payload: [...courses.data],
    });
  },

  loadCourseFavorite: async (data, dispatch) => {
    const { accountId } = data;

    const courses = await accountApi.getCourseFavorite(accountId, {
      getInfo: ["lectureCount", "teacherName", "firstLecture"],
    });

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_COURSE_FAVORITE,
      payload: [...courses.data],
    });
  },

  changeAvatar: async (file, currentSrc, dispatch, dispatchAuth) => {
    const formData = new FormData();
    formData.append("currentSrc", currentSrc);
    formData.append("srcImage", file);
    const res = (await accountApi.uploadAvatar(formData)).data;

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_AVATAR_ACCOUNT,
      payload: res.srcImage,
    });

    dispatchAuth({
      type: AUTH_ACTION.UPDATE_AVATAR_ACCOUNT,
      payload: res.srcImage,
    });
  },
};
