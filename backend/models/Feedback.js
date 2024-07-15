const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    stars: { type: Number, required: true },
    comments: { type: String, required: true },
  },
  { collection: "Feedback" }
);
module.exports = mongoose.model("Feedback", FeedbackSchema);
