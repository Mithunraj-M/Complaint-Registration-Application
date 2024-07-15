const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    stars: { type: Number },
    comments: { type: String },
  },
  { collection: "Feedback" }
);
module.exports = mongoose.model("Feedback", FeedbackSchema);
