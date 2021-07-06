import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: (filter={}) => {
    const url = "categories";
    return axiosClient.get(url, {params: {...filter}});
  },

  getAllCourseByCatId : (id) => {
    const url = `categories/${id}/courses`;
    return axiosClient.get(url);
  },

  getSingle: (id) => {
    const url = `categories/${id}`;
    return axiosClient.get(url);
  },
};
export default categoryApi;
