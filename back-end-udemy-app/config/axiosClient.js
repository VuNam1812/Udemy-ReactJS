const axios = require('axios').default;
const queryString = require('query-string');
require('dotenv').config();

const axiosClient = axios.create({
    baseURL: 'https://graph.facebook.com',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
    params: {
        access_token: process.env.PAGE_ACCESS_TOKEN
    }
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
module.exports = axiosClient;