import axiosClient from "./axiosClient";

const accountApi = {
  createAccount: (data) => {
    const url = "accounts";
    return axiosClient.post(url, { ...data });
  },
  getAll: (data) => {
    const url = "accounts";
    return axiosClient.get(url, { params: { ...data } });
  },
  getSingle: (id, data) => {
    const url = `accounts/${id}`;
    return axiosClient.get(url, { params: { ...data } });
  },

  getCourseJoin: (id, data = {}) => {
    const url = `accounts/${id}/coursesJoin`;
    return axiosClient.get(url, { params: { ...data } });
  },
  getCourseFavorite: (id, data = {}) => {
    const url = `accounts/${id}/coursesFavorite`;
    return axiosClient.get(url, { params: { ...data } });
  },

  checkEmailAvailable: (data) => {
    const url = `accounts/available`;
    return axiosClient.get(url, { params: { ...data } });
  },

  checkPassword: (data) => {
    const url = "accounts/verify";
    return axiosClient.get(url, { params: { ...data } });
  },

  uploadAvatar: (data) => {
    const url = `accounts/upload`;
    return axiosClient.put(url, data);
  },

  updateInfo: (id, data) => {
    const url = `accounts/${id}`;
    return axiosClient.patch(url, { ...data });
  },

  updateActive: (id, data) => {
    const url = `accounts/${id}/active`;
    return axiosClient.patch(url, { ...data });
  },
};
export default accountApi;
