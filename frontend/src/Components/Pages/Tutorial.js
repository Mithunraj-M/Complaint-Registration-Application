import React from "react";
import progress from "./Assets/Images/ComplaintProgress.png";
import dash from "./Assets/Images/dashboard.png";
import login from "./Assets/Images/Login.png";
import register from "./Assets/Images/Register.png";
import signup from "./Assets/Images/SignUp.png";
import view from "./Assets/Images/ViewComplaint.png";
import "./Tutorial.css";
const Tutorial = () => {
  return (
    <div className="container">
      <div>
        <br></br>
        <h1>Step 1:</h1>
        <p>Sign up by entering the details to create an account.</p>
        <img src={signup} alt="SignUp" className="view"></img>
      </div>
      <div>
        <br></br>
        <br></br>
        <h1>Step 2:</h1>
        <p>Login with the registered details to enter into the dashboard</p>
        <img src={login} alt="view" className="view"></img>
      </div>
      <div>
        <br></br>
        <br></br>
        <h1>Step 3:</h1>
        <p>To lodge a complaint click on the Lodge complaint box.</p>
        <img src={dash} alt="dash" className="view"></img>
      </div>
      <div>
        <br></br>
        <br></br>
        <h1>Step 4:</h1>
        <p>
          Fill the required details and upload the photo and video proof of the
          complaint
        </p>
        <img src={register} alt="register" className="view"></img>
      </div>
      <div>
        <br></br>
        <br></br>
        <h1>Step 5:</h1>
        <p>To View the lodged complaints click on the view complaint box.</p>
        <img src={dash} alt="dash" className="view"></img>
      </div>
      <div>
        <br></br>
        <br></br>
        <h1>Step 6:</h1>
        <p>
          All the lodged complaints can be viewed according to the filteration.
        </p>
        <img src={view} alt="view" className="view"></img>
      </div>
      <div>
        <br></br>
        <br></br>
        <h1>Step 7:</h1>
        <p>
          To check the progress of the Complaint status click on view on going
          status.
        </p>
        <img src={dash} alt="dash" className="view"></img>
      </div>
      <div>
        <br></br>
        <br></br>
        <h1>Step 8:</h1>
        <p>
          Once the complaint is resolved and has been verified then you can
          close the complaint.
        </p>
        <img src={progress} alt="progress" className="view"></img>
      </div>
    </div>
  );
};

export default Tutorial;
