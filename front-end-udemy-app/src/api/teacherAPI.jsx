import axiosClient from "./axiosClient";

const accountApi = {
  createAccount: (data) => {
    const url = "teachers";
    return axiosClient.post(url, { ...data });
  },
  getAll: () => {
    const url = "teachers";
    return axiosClient.get(url);
  },
  getSingle: (id, data) => {
    const url = `teachers/${id}`;
    return axiosClient.get(url, { params: { ...data } });
  },
  getCourses: (id, data) => {
    const url = `teachers/${id}/courses`;
    return axiosClient.get(url, { params: { ...data } });
  },
};
export default accountApi;
