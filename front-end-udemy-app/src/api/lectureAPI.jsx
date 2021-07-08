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
};
export default lectureApi;
