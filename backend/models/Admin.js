const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String },
    phone: { type: String },
    password: { type: String },
  },
  { collection: "Admin" }
);

module.exports = mongoose.model("Admin", AdminSchema);
