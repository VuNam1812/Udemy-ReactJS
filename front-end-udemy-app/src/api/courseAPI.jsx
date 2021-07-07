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
};
export default courseApi;
