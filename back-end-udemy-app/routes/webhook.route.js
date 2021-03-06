const express = require("express");

const router = express.Router();

const setupMessage = require("../middlewares/fbChatBot/setupMessage");
const handleCourse = require("../middlewares/route/course.mdw");
const handleWebhook = require("../middlewares/fbChatBot/handleWebhook");
const courseModel = require("../models/course.model");
require("dotenv").config();
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

router.post("/", (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      const webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleWebhook.handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handleWebhook.handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

router.get("/", (req, res) => {
  // Your verify token. Should be a random string.

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");

      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

router.get("/courses/:id", async (req, res) => {
  const { id } = req.params;

  const course = await courseModel.single(id);
  await handleCourse.getMoreInfoCourse(course, [
    "duration",
    "teacherName",
    "lectureCount",
    "catName",
  ]);
  return res.render("course.detail.hbs", {
    course,
  });
});

router.get("/setup-profile", async (req, res) => {
  await setupMessage.setupAll();

  res.json({
    result: "success",
  });
});

router.get("/setup-whitelisted-domains", async (req, res) => {
  await setupMessage.setupWhitelisted();

  res.json({
    result: "success",
  });
});

module.exports = router;
