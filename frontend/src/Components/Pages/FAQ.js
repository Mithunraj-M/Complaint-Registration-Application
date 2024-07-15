import React from "react";
import FaqWaves from "./Assets/Images/Faqwaves.png";
import FAQFirst from "./Assets/Images/Frame 42.png";
import Target from "./Assets/Images/target.png";
import "./faq.css";

const FaqQuestions = [
  {
    question: "How does the application work?",
    answer:
      "Our application allows users to easily post photos and videos of social issues they encounter, such as road blockages or drainage problems. These posts are then shared with the relevant government or local bodies for prompt resolution.",
  },
  {
    question: "How can I report a social issue?",
    answer:
      "To report a social issue, simply create an account on our platform and upload photos or videos of the problem you want to address. Provide a brief description and any additional relevant details. Our system will ensure that your complaint reaches the appropriate authorities.",
  },
  {
    question: "What happens after I submit a complaint?",
    answer:
      "Once you submit a complaint, our application automatically forwards it to the relevant government or local bodies responsible for addressing the issue. They will review the complaint and take appropriate action to resolve it. You can track the progress of your complaint through our platform.",
  },
  {
    question: "How can I stay updated on the progress of my complaint?",
    answer:
      "Our application provides a tracking feature that allows you to monitor the status of your complaint. You will receive notifications and updates as the authorities work towards resolving the issue. This ensures transparency and keeps you informed throughout the process.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "We prioritize the security and privacy of our users. Your personal information is protected and will only be used for the purpose of addressing the reported social issues. We adhere to strict data protection protocols to ensure the confidentiality of your information.",
  },
  {
    question: "Can I report issues anonymously?",
    answer:
      "Yes, we understand that some users may prefer to report issues anonymously. Our application provides an option to submit complaints without revealing your identity. However, providing contact information can help authorities reach out to you for further details if needed.",
  },
  {
    question: "How long does it take for issues to be resolved?",
    answer:
      "The time taken to resolve issues can vary depending on the nature and complexity of the problem. We strive to ensure that complaints are addressed promptly. However, please note that certain issues may require more time for investigation and resolution.",
  },
  {
    question:
      "Can I provide additional information or updates on a reported issue?",
    answer:
      "Yes, you can provide additional information or updates on a reported issue through our platform. Simply access your complaint and add any relevant details or progress updates. This helps authorities have a comprehensive understanding of the situation.",
  },
];

function Faq() {
  return (
    <div>
      <section className="main-page">
        <div className="firstbox">
          <div className="logo">
            <img src={FAQFirst} alt="logo" />
          </div>
        </div>
        <div className="secondbox">
          {FaqQuestions.map((item, index) => (
            <div key={index} className="frame31">
              <img src={Target} alt="target" />
              <div>
                <div>{item.question}</div>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="waves">
          <img src={FaqWaves} alt="waves"></img>
        </div>
      </section>
    </div>
  );
}

export default Faq;
