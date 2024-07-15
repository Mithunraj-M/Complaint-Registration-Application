import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Login from "./Assets/Images/Login.jpg";
import Resolution from "./Assets/Images/Resolution.jpg";
import Submit from "./Assets/Images/Submit.jpg";
import Track from "./Assets/Images/Track.png";
import Update from "./Assets/Images/Update.jpg";
import "./Timeline.css";

const timelineData = [
  {
    heading: "Register/Login",
    text: "Create an account or log in to your existing account to start using the portal.",
    image: Login,
  },
  {
    heading: "Submit a Grievence ",
    text: 'Navigate to the "Submit a Grievance" section and fill  out the form with your complaint details. Be sure to provide all necessary  information to help us address your issue effectively.',
    image: Submit,
  },
  {
    heading: "Track Your Complaint",
    text: "After submission, you will receive a unique tracking ID. Use this ID to monitor the status of your grievance in real-time.",
    image: Track,
  },
  {
    heading: "Receive Updates",
    text: "Stay informed with regular updates via email and SMS notifications about the progress of your complaint.",
    image: Update,
  },
  {
    heading: "Resolution",
    text: "Our dedicated team works diligently to resolve your issues. Once resolved, you will receive a notification along with the resolution details.",
    image: Resolution,
  },
];

const Timeline = () => {
  return (
    <div className="custom-container">
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="row no-gutters justify-content-center justify-content-md-around align-items-start  timeline-nodes  justify-content-sm-b"
          >
            <div className="col-8 col-md-5 order-2 order-md-1 timeline-content p-0 ">
              <h3>{item.heading}</h3>
              <p>{item.text}</p>
            </div>
            <div className="col-2 col-sm-1 px-md-7 order-1 timeline-image text-md-center align-center">
              <img src={item.image} className="img-fluid" alt="img" />
            </div>
            <div className="col-8 col-md-5 order-1 order-md-3 py-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
