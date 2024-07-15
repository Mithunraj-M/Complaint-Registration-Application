import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedEmail from "./Assets/Icons/FeedEmail.png";
import UserName from "./Assets/Icons/username.png";
import "./FeedbackForm.css";

function FeedbackForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stars: 0,
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (stars) => {
    setFormData({ ...formData, stars });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // Handle form submission logic here
    try {
      await axios.post("http://localhost:5000/api/feedback", formData);
      window.alert("Thanks for the feedback");
    } catch (error) {
      console.log("Could not register the feedback", error);
      console.log("Error while uploading feedback");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('bgbgbg.png')" }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Feedback Form</h2>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <img src={UserName} alt="Name Icon" className="w-6 h-6 mr-2" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <img src={FeedEmail} alt="Email Icon" className="w-6 h-6 mr-2" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Share your experience in scaling
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`text-2xl focus:outline-none ${
                    star <= formData.stars ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add your comments..."
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={() => navigate("/dashboard")}
            >
              Cancel and Return
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
