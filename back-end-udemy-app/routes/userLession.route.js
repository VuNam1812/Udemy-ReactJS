const express = require("express");

const lectureModel = require("../models/lecture.model");
const userLessionModel = require("../models/userLession.model");

const router = express.Router();

const auth = require("../middlewares/auth.mdw");

router.put("/", auth, async (req, res) => {
  const { id_lecture, lastSeconds } = req.body;
  const { userId } = req.accessTokenPayload;
  const lecture = await lectureModel.single(id_lecture);

  const isCompleted = +Math.round(lecture.duration * 0.9) <= +lastSeconds;

  const target = await userLessionModel.singleByUserIdAndLectureId(
    userId,
    id_lecture
  );
  if (target === null) {
    await userLessionModel.add({
      ...req.body,
      id_user: userId,
      isCompleted: isCompleted,
    });
    return res.json({});
  }
  await userLessionModel.update(target.id, {
    ...target,
    isCompleted: +target.isCompleted || isCompleted ? 1 : 0,
    lastSeconds: +lastSeconds,
  });

  return res.json({});
});

module.exports = router;
