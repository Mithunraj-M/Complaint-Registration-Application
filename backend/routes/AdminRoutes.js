const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

router.post("/Adminlogin", async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const admin = await Admin.findOne({ phone });
    if (!admin) {
      console.log("Phone number not found");
      return res
        .status(404)
        .json({ message: "Could not find the phone number" });
    }
    const isPassword = admin.password === password;
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isEmail = admin.email === email;
    if (!isEmail) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error("Couldn't find the user", error);
  }
});

module.exports = router;
