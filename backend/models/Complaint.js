const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    othercategory: { type: String },
    state: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    comment: { type: String, required: true },
    photo: { type: String },
    video: { type: String },
    phoneId: { type: String },
    status: { type: String, default: "pending" },
    likes: { type: Number, default: 0 },
  },
  { collection: "Complaints" }
); // Explicitly specify the collection name if needed

module.exports = mongoose.model("Complaint", ComplaintSchema);
