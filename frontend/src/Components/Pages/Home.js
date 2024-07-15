import React from "react";
import vision_image from "./Assets/Images/vision.jpg";
import "./Content.css";
import LoginMainPage from "./LoginMainPage.js";

const Home = () => {
  return (
    <>
      <LoginMainPage></LoginMainPage>
      <div className="box">
        <div className="image-container">
          <img src={vision_image} alt="image" id="vision_img" />
        </div>
        <div className="text-container">
          <h1>Our Vision</h1>
          <p>
            Providing a transparent, efficient, and user-friendly platform for
            all citizens to voice their grievances. Fostering trust and
            accountability by ensuring that every concern is heard and addressed
            swiftly. Join us in our mission to build a better future by
            reporting social issues and collaborating towards their resolution.
          </p>
        </div>
      </div>
      <div className="impact">
        <h1 className="text-5xl">OUR IMPACT BY NUMBERS</h1>
        <div className="Main-impact flex justify-around align-center mt-20">
          <div>
            <h1 className="text-6xl text-blue-800">500</h1>
            <p className="text-2xl">Website Views</p>
          </div>
          <div>
            <h1 className="text-6xl text-blue-800">200</h1>
            <p className="text-2xl">Complaints Registered</p>
          </div>
          <div>
            <h1 className="text-6xl text-blue-800">150</h1>
            <p className="text-2xl">Complaints Resolved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
