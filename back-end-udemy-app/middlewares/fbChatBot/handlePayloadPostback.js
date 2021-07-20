const responsePayload = require("./responsePayload");
const eventMessageUser = require("./eventMessageUser");
const handlePayloadPost = {
  getStarted: async (sender_psid) => {
    const responses = await responsePayload.GET_STARTED(sender_psid);
    await eventMessageUser.callMarkSeen(sender_psid);
    await eventMessageUser.callTypingOn(sender_psid);
    setTimeout(async () => {
      for (const res of responses) {
        await eventMessageUser.callSendAPI(sender_psid, res);
      }
    }, 2000);
  },

  searchCourses: async (sender_psid) => {
    const response = await responsePayload.SEARCH_COURSES_POSTBACK();
    await eventMessageUser.callMarkSeen(sender_psid);
    await eventMessageUser.callTypingOn(sender_psid);
    setTimeout(async () => {
      await eventMessageUser.callSendAPI(sender_psid, response);
    }, 1000);
  },
};

module.exports = handlePayloadPost;
