const axios = require("axios");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/user.model");
require("dotenv").config();

const fbLogin = {
  checkValidToken: async (access_token, userId) => {
    const res = await axios.get(`https://graph.facebook.com/debug_token`, {
      params: {
        access_token: process.env.PAGE_VERIFY_TOKEN,
        input_token: access_token,
      },
    });

    const { user_id, app_id } = res.data.data;

    return +user_id === +userId && +app_id === +process.env.FB_APP_ID;
  },
  getFullSizeImage: async (userId, access_token) => {
    const res = await axios.get(
      `https://graph.facebook.com/v11.0/${userId}/picture`,
      {
        params: {
          access_token: access_token,
          type: "square",
          width: "512",
          height: "512",
          redirect: "false",
        },
      }
    );
    return res.data.data.url;
  },
  createAccount: async (data) => {
    const srcImage = await fbLogin.getFullSizeImage(
      data.userID,
      data.access_token
    );
    const hash = bcrypt.hashSync(data.userID, 10);
    const user = {
      name: data.name,
      password: hash,
      facebookId: data.userID,
      email: "",
      phone: "",
      permission: 2,
      status: 1,
      srcImage: srcImage,
    };

    const accountID = await userModel.add(user);
    return accountID;
  },
};

module.exports = fbLogin;
