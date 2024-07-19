import React, { useState } from "react";
import "./SwapAboutDivisions.css";
import PeopleTogether from "./Assets/Images/peopletogether.jpg"
import HelpPeople from "./Assets/Images/helppeople.jpg"
import WorldTogether from "./Assets/Images/worldtogether.jpg"

const SwapAboutDivisions = () => {
  const [middleDiv, setMiddleDiv] = useState(2); // Set the middle division to 2 by default

  const handleSwap = (div) => {
    setMiddleDiv(div);
  };

  return (
    <>
      <section className="main-page-aboutcontent">
        <div className="containerAbout">
          <div
            className={`divisionAbout ${middleDiv === 1 ? "middleAbout" : "behindAbout"}`}
            onMouseEnter={() => handleSwap(1)}
            style={{ zIndex: middleDiv === 1 ? 2 : 1 }}
          >
            <img src={PeopleTogether} alt="Division 1" className="divisionImage" />
            <p className="divisionText">Our platform enables citizens to easily and conveniently raise complaints with the concerned department, leveraging technology to streamline the process. By setting clear accountability for the concerned nodal officers, we help the government serve people more effectively.</p>
          </div>
          <div
            className={`divisionAbout ${middleDiv === 2 ? "middleAbout" : "behindAbout"}`}
            onMouseEnter={() => handleSwap(2)}
            style={{ zIndex: middleDiv === 2 ? 2 : 1 }}
          >
            <img src={WorldTogether} alt="Division 2" className="divisionImage" />
            <p className="divisionText"> Your one-stop solution for resolving grievances and ensuring your voice is heard. We understand the importance of addressing complaints and providing timely resolutions, which is why we have created this platform specifically for Indian citizens.
            Our mission is to streamline the grievance process, making it easier and more efficient for you to raise and track your complaints. </p>
          </div>
          <div
            className={`divisionAbout ${middleDiv === 3 ? "middleAbout" : "behindAbout"}`}
            onMouseEnter={() => handleSwap(3)}
            style={{ zIndex: middleDiv === 3 ? 2 : 1 }}
          >
            <img src={HelpPeople} alt="Division 3" className="divisionImage" />
            <p className="divisionText">We employ a two-factor verification approach to filter genuine complaints and ensure the redressal mechanism is properly enacted, guaranteeing that citizens receive solutions to their problems until the end.      </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SwapAboutDivisions;
