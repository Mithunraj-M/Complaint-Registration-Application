import axios from "axios";
import bcrypt from "bcryptjs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DOB from "./Assets/Icons/dob.png";
import Email from "./Assets/Icons/email.png";
import Name from "./Assets/Icons/name.png";
import Pass from "./Assets/Icons/pass.png";
import Phone from "./Assets/Icons/phone.png";
import "./LoginMainPage.css";

const LoginMainPage = () => {
  // State variables
  const [isLogin, setIsLogin] = useState(true);
  const [alignEnd, setAlignEnd] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [phoneId, setPhoneId] = useState("");

  const navigate = useNavigate();

  // Function to toggle between login and signup forms
  const handleToggle = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setAlignEnd(!alignEnd);
      setIsFading(false);
    }, 500);
  };

  // hash passwords using bcrypt
  const encryptPass = async (password) => {
    return await bcrypt.hash(password, 8);
  };

  const clearData = () => {
    document.getElementById("signup-first-name").value = "";
    document.getElementById("signup-last-name").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-phone").value = "";
    document.getElementById("signup-dob").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("signup-confirmpassword").value = "";
  };

  // Function to handle login process
  const handleLogin = async () => {
    try {
      const phone = document.getElementById("login-phone").value;
      const password = document.getElementById("login-password").value;

      // Send login request to the backend API
      const response = await axios.post("http://localhost:5000/api/login", {
        phone,
        password,
      });

      console.log("Login Response:", response.data);

      // Handle response from the server
      if (response.data.message === "Login successful") {
        setPhoneId(phone); // Store phone number in state
        navigate("/AdminDashboard");
        // navigate("/dashboard", { state: { phoneId: phone } });
      } else {
        window.alert("User not found. Check your phone number or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      window.alert("An error occurred while logging in. Please try again.");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    return phone.length === 10 && /^\d{10}$/.test(phone);
  };

  // Function to handle signup process
  const handleSignup = async () => {
    try {
      const firstName = document.getElementById("signup-first-name").value;
      const lastName = document.getElementById("signup-last-name").value;
      const email = document.getElementById("signup-email").value;
      const phone = document.getElementById("signup-phone").value;
      const dob = document.getElementById("signup-dob").value;
      let password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById(
        "signup-confirmpassword"
      ).value;

      // Validate password confirmation
      if (password !== confirmPassword) {
        window.alert("Passwords do not match.");
        return;
      }

      // Validate phone number format
      if (!validatePhoneNumber(phone)) {
        window.alert("Phone number must be 10 digits.");
        return;
      }

      // Validate email format
      if (!validateEmail(email)) {
        window.alert("Invalid email format.");
        return;
      }

      // Hash the password before sending it to the server
      const hashedPassword = await encryptPass(password);

      // Send signup request to the backend API
      const response = await axios.post("http://localhost:5000/api/signup", {
        firstName,
        lastName,
        email,
        phone,
        dob,
        password: hashedPassword,
      });

      console.log("Signup Response:", response.data);
      window.alert("Signup successful! Please log in."); // Notify user on successful signup
      clearData();
    } catch (error) {
      console.error("Signup Error:", error);
      window.alert("An error occurred while signing up. Please try again.");
      clearData();
    }
  };

  return (
    <>
      <section
        className={`MainBody px-14 ${alignEnd ? "align-end" : "align-start"}`}
      >
        <div className={`Big-Text ${isFading ? "fade-out" : "fade-in"}`}>
          Empowering Indian Citizens, Building Trust, and Rebuilding a More
          Equitable Future.
        </div>
        <div
          className={`PhoneDiv rounded-3xl pt-4 ${
            isFading ? "fade-out" : "fade-in"
          }`}
        >
          <div className="SubtractDiv"></div>
          <div className="WavePicPhone w-full"></div>
          {isLogin ? (
            <div className="LogIn p-10">
              <p className="user-sign-text font-bold text-3xl text-blue-800 mb-6 font-serif">
                User Login
              </p>
              <div className="user-phone flex space-x-2 pt-1">
                <div className="input-icon">
                  <img src={Phone} alt="phone icon" />
                </div>
                <input
                  type="text"
                  id="login-phone"
                  className="w-full py-2 border-b-2 px-3 input-in"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="Password flex space-x-2 pt-1">
                <div className="input-icon">
                  <img src={Pass} alt="password icon" />
                </div>
                <input
                  type="password"
                  id="login-password"
                  className="w-full py-2 border-b-2 px-3 input-in"
                  placeholder="Enter Password"
                />
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white font-bold text-2xl py-2 rounded-full mt-4"
              >
                LOGIN
              </button>
              <div className="login-page flex justify-around mt-4">
                Don't have an account?
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          ) : (
            <div className="SignUp p-10 pt-1">
              <p className="user-sign-text font-bold text-3xl text-blue-800 mb-6">
                User Sign Up
              </p>
              <div className="User-Names flex space-x-2 justify-around">
                <div className="input-icon user">
                  <img src={Name} alt="user icon" />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    id="signup-first-name"
                    className="w-full py-2 border-b-2 px-3 input-in"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="input-icon">
                  <img src={Name} alt="user icon" />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    id="signup-last-name"
                    className="w-full py-2 border-b-2 px-3 input-in"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="user-email flex space-x-2 pt-2">
                <div className="input-icon">
                  <img src={Email} alt="email icon" />
                </div>
                <input
                  type="text"
                  id="signup-email"
                  className="w-full py-2 border-b-2 px-3 input-in"
                  placeholder="Enter email"
                />
              </div>
              <div className="user-phone flex space-x-2 pt-2">
                <div className="input-icon">
                  <img src={Phone} alt="phone icon" />
                </div>
                <input
                  type="text"
                  id="signup-phone"
                  className="w-full py-2 border-b-2 px-3 input-in"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="user-dob flex space-x-2 pt-3">
                <div className="input-icon">
                  <img src={DOB} alt="dob icon" />
                </div>
                <label htmlFor="user-dob" className="text-zinc-600">
                  Enter DOB:
                </label>
                <input
                  type="date"
                  id="signup-dob"
                  className="w-fit border-b-2 px-4 pl-10 input-in "
                />
              </div>
              <div className="Password flex space-x-2 pt-2">
                <div className="input-icon">
                  <img src={Pass} alt="password icon" />
                </div>
                <input
                  type="password"
                  id="signup-password"
                  className="w-full py-2 border-b-2 px-3 input-in"
                  placeholder="Enter Password"
                />
              </div>
              <div className="Password flex space-x-2 pt-2">
                <div className="input-icon">
                  <img src={Pass} alt="password icon" />
                </div>
                <input
                  type="password"
                  id="signup-confirmpassword"
                  className="w-full py-2 border-b-2 px-3 input-in"
                  placeholder="Confirm Password"
                />
              </div>
              <button
                type="submit"
                onClick={handleSignup}
                className="w-full bg-blue-500 text-white font-bold text-2xl py-2 rounded-full mt-4 mb-2"
              >
                Sign Up
              </button>
              <div className="login-page flex justify-around ">
                Already have an account?
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-500"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LoginMainPage;
