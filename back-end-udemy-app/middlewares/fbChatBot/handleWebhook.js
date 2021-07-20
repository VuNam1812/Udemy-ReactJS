const enumPayload = require("../../enums/payloadPostback");
const handlePayloadPost = require("./handlePayloadPostback");
const handlePayloadMessage = require("./handlePayloadMessage");

let CURRENT_PAYLOAD = "";
const handleWebhook = {
  handleMessage: async (sender_psid, received_message) => {
    let response;

    // Checks if the message contains text
    if (received_message.text) {
      // Create the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      if (received_message.text === ".") {
        await handlePayloadMessage.sendMenuFeatures();
        CURRENT_PAYLOAD = "";
        return;
      }
      switch (CURRENT_PAYLOAD) {
        case enumPayload.SEARCH_COURSES:
          await handlePayloadMessage.searchCourses(
            sender_psid,
            received_message.text
          );
          CURRENT_PAYLOAD = enumPayload.SEARCH_COURSES;
          break;
        default:
          callMarkSeen(sender_psid);
          callTypingOn(sender_psid);
          response = { text: "Xin lỗi bạn, Tôi chỉ là một Bot!!" };
          callSendAPI(sender_psid, response);

          break;
      }
    }
  },

  // Handles messaging_postbacks events
  handlePostback: async (sender_psid, received_postback) => {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    switch (payload) {
      case enumPayload.RESTART_BOT:
      case enumPayload.GET_STARTED:
        await handlePayloadPost.getStarted(sender_psid);
        break;
      case enumPayload.SEARCH_COURSES:
        await handlePayloadPost.searchCourses(sender_psid);
        CURRENT_PAYLOAD = enumPayload.SEARCH_COURSES;
        break;
      default:
        break;
    }
    // Send the message to acknowledge the postback
  },
};
module.exports = handleWebhook;
