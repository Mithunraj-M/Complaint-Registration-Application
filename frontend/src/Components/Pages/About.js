import React from "react";
import call_img from "./Assets/Icons/call_icon.jpg";
import loc_img from "./Assets/Icons/location_icon.jpg";
import mail_img from "./Assets/Icons/mail_icon.jpg";
import about_img from "./Assets/Images/about_img.jpg";
import "./Content.css";
import Timeline from "./Timeline";
import AboutContentSwap from "./AboutContentSwap"

const About = () => {
  return (
    <>
      <div className="image-container-abt">
        <img src={about_img} alt="img"></img>
        <div className="text-overlay">
          <p>
            <b>About Us</b>
          </p>
        </div>
      </div>
      <div className="abt_content">
        <AboutContentSwap/>
      </div>
      <div className="guidance">
        <h1 className="text-center">How does it work?</h1>
        <Timeline></Timeline>
      </div>
      <div className="contact">
        <h1>Queries?</h1>
        <br></br>
        <h2>Contact us</h2>
        <div>
          <div className="contact-items">
            <div className="contact-item">
              <img src={call_img} alt="img" className="icon-quary"></img>
              <p>call us at</p>
              <p>080-1234567890</p>
            </div>
            <div className="contact-item">
              <img src={loc_img} alt="img" className="icon-quary"></img>
              <p>Lorem epsum</p>
            </div>
            <div className="contact-item">
              <img src={mail_img} alt="img" className="icon-quary"></img>
              <p>Email us at</p>
              <p>ComplaintGovt@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
