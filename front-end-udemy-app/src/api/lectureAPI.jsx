import axiosClient from "./axiosClient";

const lectureApi = {
  getAll: () => {
    const url = "lectures";
    return axiosClient.get(url);
  },
  getSingle: (id, data) => {
    const url = `lectures/${id}`;
    return axiosClient.get(url, { params: { ...data } });
  },

  create: (data) => {
    const url = `lectures`;
    return axiosClient.post(url, data);
  },

  updateInfo: (id, data) => {
    const url = `lectures/${id}`;
    return axiosClient.patch(url, data);
  },

  delete: (id) => {
    const url = `lectures/${id}`;
    return axiosClient.delete(url);
  },
};
export default lectureApi;
