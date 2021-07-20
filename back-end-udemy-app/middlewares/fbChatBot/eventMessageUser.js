const messageAPI = require("../../API/messageAPI");

const eventMessageUser = {
  // Sends response messages via the Send API
  callSendAPI: async (sender_psid, response) => {
    // Construct the message body
    let request_body = {
      recipient: {
        id: sender_psid,
      },

      message: response,
    };

    await messageAPI.sendToUser(request_body);

    // Send the HTTP request to the Messenger Platform
  },

  callTypingOn: async (sender_psid) => {
    let request_body = {
      recipient: {
        id: sender_psid,
      },
      sender_action: "typing_on",
    };

    await messageAPI.sendToUser(request_body);
  },

  callMarkSeen: async (sender_psid) => {
    let request_body = {
      recipient: {
        id: sender_psid,
      },
      sender_action: "mark_seen",
    };

    await messageAPI.sendToUser(request_body);
  },
};

module.exports = eventMessageUser;
