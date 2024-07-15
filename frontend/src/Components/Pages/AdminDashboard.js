import React, { useState } from "react";
import "./AdminDashboard.css";
import image1 from "./Assets/Images/road.jpg";

const complaints = [
  {
    trackingId: "#20462",
    date: "13/05/2024",
    category: "Road Problem",
    photo: image1,
    Complaint:
      "Lorem ipsum dolor sit amet consectetur. Quis sollicitudin orci libero aliquet feugiat tempus vel. Id ac mattis in dui pulvinar  Id ac mattis in dui pulvinar  Id ac mattis ...",
    Status: "Resolved",
  },
  {
    trackingId: "#20463",
    date: "14/05/2024",
    category: "Water Leakage",
    photo: "image2",
    Complaint:
      "Vivamus tristique eros vitae magna mollis, a pulvinar felis tincidunt. Praesent id dolor ut justo facilisis tempor at a augue. Sed at fringilla ipsum ...",
    Status: "Pending",
  },
  {
    trackingId: "#20464",
    date: "15/05/2024",
    category: "Street Light",
    photo: "image3",
    Complaint:
      "Duis et nisi id nisi facilisis sodales. Integer vehicula lacinia lacus, vel bibendum eros. Integer nec nulla et libero dignissim posuere ...",
    Status: "In Progress",
  },
  {
    trackingId: "#20465",
    date: "16/05/2024",
    category: "Garbage Collection",
    photo: "image4",
    Complaint:
      "Aliquam erat volutpat. Phasellus gravida dapibus justo, ut consectetur ipsum malesuada at. Proin laoreet nisl et dolor egestas suscipit ...",
    Status: "Resolved",
  },
  {
    trackingId: "#20467",
    date: "18/05/2024",
    category: "Power Outage",
    photo: "image6",
    Complaint:
      "Sed euismod felis nec neque consequat, non condimentum ex vestibulum. Nulla at vehicula sapien, sed sagittis ex. Donec rutrum orci vitae ...",
    Status: "Resolved",
  },
  {
    trackingId: "#20468",
    date: "19/05/2024",
    category: "Potholes",
    photo: "image7",
    Complaint:
      "Ut tincidunt augue et urna fermentum, ac luctus ipsum feugiat. Cras eu enim vel risus malesuada tincidunt a ut magna ...",
    Status: "In Progress",
  },
];

const AdminDashboard = () => {
  const [selectedStatuses, setSelectedStatuses] = useState(
    complaints.reduce((acc, complaint) => {
      acc[complaint.trackingId] = complaint.Status;
      return acc;
    }, {})
  );

  const handleStatusChange = (trackingId, newStatus) => {
    setSelectedStatuses({ ...selectedStatuses, [trackingId]: newStatus });
  };

  return (
    <>
      <section className="Main-Page">
        <div className="first-image"></div>
        <div className="main-heading text-center mt-8 text-4xl mb-4">
          Viewing All Received Complaints
        </div>
        <div>
          <table className="complaint-table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Date</th>
                <th>Category</th>
                <th>Photo</th>
                <th>Complaint</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                  <td>{complaint.trackingId}</td>
                  <td>{complaint.date}</td>
                  <td>{complaint.category}</td>
                  <td>
                    <img
                      src={complaint.photo}
                      alt="complaint"
                      style={{ width: "5em", height: "5em" }}
                    />
                  </td>
                  <td className="complaint">{complaint.Complaint}</td>
                  <td>
                    <select
                      className={`status ${selectedStatuses[complaint.trackingId]
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      value={selectedStatuses[complaint.trackingId]}
                      onChange={(e) =>
                        handleStatusChange(complaint.trackingId, e.target.value)
                      }
                    >
                      <option value="Resolved">Resolved</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
