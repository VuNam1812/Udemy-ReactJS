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

  checkPaid: (data) => {
    const url = `courses/payment`;
    return axiosClient.get(url, { params: { ...data } });
  },

  paymentCourse: (id) => {
    const url = `courses/${id}/payment`;
    return axiosClient.post(url);
  },

  addFavoriteList: (id) => {
    const url = `courses/${id}/favorite`;
    return axiosClient.post(url);
  },

  createCourse: (data) => {
    const url = "courses";
    return axiosClient.post(url, { ...data });
  },

  createFeedback: (id, data) => {
    const url = `courses/${id}/feedbacks`;
    return axiosClient.post(url, { ...data });
  },

  uploadInfo: (id, data) => {
    const url = `courses/${id}`;
    return axiosClient.patch(url, { ...data });
  },

  uploadImage: (id, data) => {
    const url = `courses/${id}/uploadImage`;
    return axiosClient.put(url, data);
  },

  updateActive: (id, data) => {
    const url = `courses/${id}/active`;
    return axiosClient.patch(url, { ...data });
  },

  deleteFavoriteList: (id) => {
    const url = `courses/${id}/favorite`;
    return axiosClient.delete(url);
  },
};
export default courseApi;
