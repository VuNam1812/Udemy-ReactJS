const bcrypt = require("bcryptjs");
const userModel = require("../../models/user.model");
const slugify = require("slugify");
require("dotenv").config();

const configSlug = (name) => {
  return slugify(name, {
    locale: "vi",
    lower: true,
  });
};

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
      slug: configSlug(data.name),
    };

    const accountID = await userModel.add(user);
    return accountID;
  },
};

module.exports = ggLogin;
