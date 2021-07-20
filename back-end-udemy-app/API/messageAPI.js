const axiosClient = require("../config/axiosClient");

const messageAPI = {
  sendToUser: (data) => {
    const url = "/v2.6/me/messages";
    return axiosClient.post(url, { ...data });
  },

  createProfile: (data) => {
    const url = "/v2.6/me/messenger_profile";
    return axiosClient.post(url, { ...data });
  },
};

module.exports = messageAPI;
