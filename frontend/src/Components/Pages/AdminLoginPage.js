import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "./Assets/Icons/email.png";
import PasswordIcon from "./Assets/Icons/pass.png";
import PhoneIcon from "./Assets/Icons/phone.png";
import BackgroundImage from "./Assets/Images/bgbgbg.png";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (!email || !phone || !password) {
        window.alert("Please fill in all fields.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/admin/Adminlogin",
        {
          email,
          phone,
          password,
        }
      );

      console.log("Login Response:", response.data);

      if (response.data.message === "Login successful") {
        navigate("/AdminDashboard");
      } else {
        window.alert(
          "Invalid credentials. Check your email, phone number, or password."
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      window.alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Welcome Section */}
      <div
        className="w-1/2 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-yellow-600 mb-4 mt-8">
            Welcome To Indian Complaint Box!
          </h2>
          <p className="text-lg text-gray-600">
            Note: Logging into the Admin Portal indicates your acceptance of{" "}
            <br />
            responsibility for all actions taken.
            <br></br>Unauthorized access may result in legal consequences..{" "}
            <br />
          </p>
        </div>
      </div>

      {/* Login Form Section */}
      <div
        className="w-1/2 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="max-w-md px-16 py-16 mt-8 bg-white bg-opacity-80 rounded-xl shadow-md">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
            Admin Login
          </h2>
          <div className="mb-4">
            <div className="flex items-center border-b border-gray-500 w-64">
              <img src={EmailIcon} alt="Email Icon" className="w-6 h-6 mr-3" />
              <input
                type="text"
                className="w-full outline-none focus:border-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border-b border-gray-500 py-2">
              <img src={PhoneIcon} alt="Phone Icon" className="w-6 h-6 mr-3" />
              <input
                type="text"
                className="w-full outline-none focus:border-blue-500"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center border-b border-gray-500 py-2">
              <img
                src={PasswordIcon}
                alt="Password Icon"
                className="w-6 h-6 mr-3"
              />
              <input
                type="password"
                className="w-full outline-none focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white font-bold text-xl py-2 rounded-full hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="text-black text-center border border-gray-400 py-2 px-4 rounded hover:bg-gray-200"
              onClick={() => navigate("/Home")}
            >
              Click Here to User Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
