const bcrypt = require("bcryptjs");
const userModel = require("../../models/user.model");
require("dotenv").config();

const ggLogin = {
  createAccount: async (data) => {
    const hash = bcrypt.hashSync(data.userID, 10);
    const user = {
      name: data.name,
      password: hash,
      googleId: data.userID,
      email: data.email,
      phone: "",
      permission: 2,
      status: 1,
      srcImage: data.srcImage,
    };

    const accountID = await userModel.add(user);
    return accountID;
  },
};

module.exports = ggLogin;
