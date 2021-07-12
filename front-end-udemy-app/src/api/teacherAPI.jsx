import axiosClient from "./axiosClient";

const teacherApi = {
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

  updateInfo: (id, data) => {
    const url = `teachers/${id}/moreInfo`;
    return axiosClient.patch(url, { ...data });
  },
};
export default teacherApi;
