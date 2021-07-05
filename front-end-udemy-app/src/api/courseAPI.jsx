import axiosClient from "./axiosClient";

const courseApi = {
  getAll: (data = {}) => {
    const url = "courses";
    return axiosClient.get(url, { params: { ...data } });
  },
  getSingle: (id) => {
    const url = `courses/${id}`;
    return axiosClient.get(url);
  },
};
export default courseApi;
