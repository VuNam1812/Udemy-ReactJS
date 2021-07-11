import axiosClient from "./axiosClient";

const courseApi = {
  getAll: (data = {}) => {
    const url = "courses";
    return axiosClient.get(url, { params: { ...data } });
  },
  getSingle: (id, params = {}) => {
    const url = `courses/${id}`;
    return axiosClient.get(url, { params: { ...params } });
  },
  getLessions: (id) => {
    const url = `courses/${id}/lessions`;
    return axiosClient.get(url);
  },
  getFeedbacks: (id) => {
    const url = `courses/${id}/feedbacks`;
    return axiosClient.get(url);
  },
  getCourseJoin: (id, data = {}) => {
    const url = `courses/${id}/coursesJoin`;
    return axiosClient.get(url, { params: { ...data } });
  },
  getCourseFavorite: (id, data = {}) => {
    const url = `courses/${id}/coursesFavorite`;
    return axiosClient.get(url, { params: { ...data } });
  },

  paymentCourse: (id) => {
    const url = `courses/${id}/payment`;
    return axiosClient.post(url);
  },

  checkPaid: (data) => {
    const url = `courses/payment`;
    return axiosClient.get(url, { params: { ...data } });
  },
};
export default courseApi;
