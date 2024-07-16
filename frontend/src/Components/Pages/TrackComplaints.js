import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import trash from "./Assets/Icons/delete.jpg"; // Assuming this is the correct path to your trash image
import "./TrackComplaint.css";

export default function Complaints() {
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneId } = location.state || "";
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (phoneId) {
      axios
        .get(`http://localhost:5000/api/complaints`)
        .then((response) => {
          const filteredComplaints = response.data.filter(
            (complaint) => complaint.phoneId === phoneId
          );
          setComplaints(filteredComplaints);
        })
        .catch((error) => {
          console.error("Error fetching complaints:", error);
        });
    }
  }, [phoneId]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/complaints/${id}`)
      .then((response) => {
        console.log("Complaint deleted:", response.data);
        setComplaints(complaints.filter((complaint) => complaint._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting complaint:", error);
      });
  };

  return (
    <>
    <section className="main-page">
      <h1 id="ComplaintHeading">Track My Complaint</h1>

      <table className="complaint-table">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Category</th>
            <th>Photo</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
              <td>{complaint._id}</td>
              <td>{complaint.category}</td>
              <td>
                <img
                  src={`http://localhost:5000/${complaint.photo}`}
                  alt="complaint"
                  style={{ width: "5em", height: "5em" }}
                />
              </td>
              <td className="complaint">{complaint.comment}</td>
              <td
                className={`status ${complaint.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {complaint.status}
              </td>
              <td className="action">
                <img
                  src={trash}
                  alt="trash bin"
                  className="trash-icon"
                  onClick={() => handleDelete(complaint._id)}
                />
                {complaint.status === "resolved" && (
                  <button
                    className="confirm-button"
                    onClick={() => handleDelete(complaint._id)}
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="last-button">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800"
          onClick={() => navigate("/dashboard")}
        >
          Return to HomePage
        </button>
      </div>
    </section>
    </>  
  );
}
