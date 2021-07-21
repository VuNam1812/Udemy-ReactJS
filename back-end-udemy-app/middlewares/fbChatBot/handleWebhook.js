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
        await handlePayloadMessage.sendMenuFeatures(sender_psid);
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
          await handlePayloadMessage.defaultMessage(sender_psid);
          CURRENT_PAYLOAD = "";
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
      case enumPayload.VIEW_CATEGORIES:
        await handlePayloadPost.viewMainCategories(sender_psid);
        break;
      case payload.startsWith(enumPayload.VIEW_SUB_CATEGORIES) ? payload : "":
        await handlePayloadPost.viewSubCategories(
          sender_psid,
          +payload.substr(16, payload.length)
        );
        break;
      case payload.startsWith(enumPayload.VIEW_COURSES_CAT) ? payload : "":
        await handlePayloadPost.viewCourseCat(
          sender_psid,
          +payload.substr(13, payload.length)
        );
        break;
      default:
        break;
    }
    // Send the message to acknowledge the postback
  },
};
module.exports = handleWebhook;
