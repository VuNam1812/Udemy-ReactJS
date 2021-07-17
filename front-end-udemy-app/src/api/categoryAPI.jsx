import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: (filter = {}) => {
    const url = "categories";
    return axiosClient.get(url, { params: { ...filter } });
  },

  getAllCourseByCatId: (id, data = {}) => {
    const url = `categories/${id}/courses`;
    return axiosClient.get(url, { params: { ...data } });
  },

  getSingle: (id) => {
    const url = `categories/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `categories`;
    return axiosClient.post(url, data);
  },

  checkAvailable: (data) => {
    const url = `categories/available`;
    return axiosClient.get(url, { params: { ...data } });
  },

  updateInfo: (id, data) => {
    const url = `categories/${id}`;
    return axiosClient.patch(url, data);
  },

  checkDelete: (id) => {
    const url = `categories/${id}/can-Delete`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    const url = `categories/${id}`;
    return axiosClient.delete(url);
  },
};
export default categoryApi;
