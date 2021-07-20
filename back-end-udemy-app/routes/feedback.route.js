const express = require("express");

const feedbackModal = require("../models/feedback.model");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const feedback = await feedbackModal.single(id);

  return res.json({
    data: feedback,
  });
});

module.exports = router;
