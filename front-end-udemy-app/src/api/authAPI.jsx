import axiosClient from "./axiosClient";

const authApi = {
  checkAvailable: (data) => {
    const url = "auth/is-available";
    return axiosClient.get(url, { params: { ...data } });
  },
  confirmCode: (code) => {
    const url = "auth/is-confirmEmail";
    return axiosClient.get(url, { params: { code: code } });
  },
  login: (data) => {
    const url = "auth/";
    return axiosClient.post(url, { ...data });
  },
};
export default authApi;
