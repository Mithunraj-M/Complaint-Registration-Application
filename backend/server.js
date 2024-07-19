const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const complaints = require("./routes/complaints");
const signupRouter = require("./routes/Signup"); // Import the sign-up route
const app = express();
const cors = require("cors"); // Import cors
const loginRouter = require("./routes/Login");
const FeedbackRouter = require("./routes/FeedbackRoutes");
const AdminRouter = require("./routes/AdminRoutes");

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware
app.use("/uploads", express.static("uploads"));
// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://Project:Test@cluster0.6c3p6lc.mongodb.net/ComplaintsDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Routes
app.use("/api/complaints", complaints);
app.use("/api/signup", signupRouter); // Use the sign-up route
app.use("/api/login", loginRouter);
app.use("/api/feedback", FeedbackRouter);
app.use("/api/admin/login", AdminRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
