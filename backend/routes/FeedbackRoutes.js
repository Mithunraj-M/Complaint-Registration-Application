const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {
  try {
    const { name, email, stars, comments } = req.body;
    const newfeedback = new Feedback({
      name,
      email,
      stars,
      comments,
    });
    await newfeedback.save();
    res.status(201).json({ message: "Feedback Reegistered" });
  } catch (error) {
    console.log("Couldn't save feedback", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
