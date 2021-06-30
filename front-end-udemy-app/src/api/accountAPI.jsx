import axiosClient from "./axiosClient";

const accountApi = {
  createAccount: (data) => {
    const url = "accounts";
    return axiosClient.post(url, { ...data });
  },
  getAll: () => {
    const url = "accounts";
    return axiosClient.get(url);
  },
  getSingle: (id) => {
    const url = `accounts/${id}`;
    return axiosClient.get(url);
  },
};
export default accountApi;
