const responsePayload = require("./responsePayload");
const eventMessageUser = require('./eventMessageUser');
const handlePayloadMessage = {
  searchCourses: async (sender_psid, search = "") => {
    const responses = await responsePayload.SEARCH_COURSES_MESSAGE(search);
    await eventMessageUser.callMarkSeen(sender_psid);
    await eventMessageUser.callTypingOn(sender_psid);
    setTimeout(async () => {
      for (const res of responses) {
        await eventMessageUser.callSendAPI(sender_psid, res);
      }
    }, 2000);
  },

  sendMenuFeatures: async (sender_psid) => {
    const responses = responsePayload.MENU_FEATURES();
    await eventMessageUser.callMarkSeen(sender_psid);
    await eventMessageUser.callTypingOn(sender_psid);
    setTimeout(async () => {
      for (const res of responses) {
        await eventMessageUser.callSendAPI(sender_psid, res);
      }
    }, 2000);
  },
};

module.exports = handlePayloadMessage;
