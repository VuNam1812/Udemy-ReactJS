const axiosClient = require('../config/axiosClient');
require('dotenv').config();

const userAPI = {
    get: async (id) => {
        const params = { fields: 'first_name,last_name,profile_pic'}
        const url = `/${id}`;
        return axiosClient.get(url, { params });
    }
}

module.exports = userAPI;