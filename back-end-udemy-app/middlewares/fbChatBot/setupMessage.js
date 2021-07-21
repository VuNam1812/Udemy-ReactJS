const messageAPI = require("../../API/messageAPI");

const setupMessage = {
  setupStarted: async () => {
    let request_body = {
      get_started: {
        payload: "GET_STARTED",
      },
    };

    await messageAPI.createProfile(request_body);
  },

  setupPersistentMenu: async () => {
    let request_body = {
      persistent_menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: "web_url",
              title: "Liên lạc với tôi",
              url: "https://www.facebook.com/namvu1998/",
              webview_height_ratio: "full",
            },
            {
              type: "web_url",
              title: "Ghé thăm Website của tôi",
              url: "https://nam-udemy-bot.herokuapp.com/",
              webview_height_ratio: "full",
            },
            {
              type: "postback",
              title: "Khởi động lại Bot",
              payload: "RESTART_BOT",
            },
          ],
        },
      ],
    };

    await messageAPI.createProfile(request_body);
  },

  setupWhitelisted: async () => {
    let req_body = {
      whitelisted_domains: ["https://udemy-1612407.herokuapp.com/"],
    };

    await messageAPI.createProfile(req_body);
  },

  setupAll: async () => {
    await setupMessage.setupStarted();
    await setupMessage.setupPersistentMenu();
  },
};

module.exports = setupMessage;
