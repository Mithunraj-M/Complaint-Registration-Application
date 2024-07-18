import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [filterStatus, setFilterStatus] = useState("All"); // State for filter

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints"
        );
        setComplaints(response.data);
        setSelectedStatuses(
          response.data.reduce((acc, complaint) => {
            acc[complaint._id] = complaint.status;
            return acc;
          }, {})
        );
      } catch (error) {
        console.log("Could not get the values", error);
      }
    };
    fetchComplaints();
  }, []);

  const handleStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/complaints/${id}/status`,
        { status: newStatus }
      );
      if (response.status === 200) {
        console.log("Status updated successfully");
        setSelectedStatuses({
          ...selectedStatuses,
          [id]: newStatus,
        });
      }
    } catch (error) {
      console.log("Failed to update status", error);
    }
  };

  const handleStatusChange = async (trackingId, newStatus) => {
    await handleStatus(trackingId, newStatus);
  };

  const getStatusOptions = (currentStatus) => {
    const statusOptions = ["Resolved", "Pending", "In Progress"];
    return statusOptions.map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ));
  };

  const filteredComplaints = complaints.filter((complaint) => {
    if (filterStatus === "All") {
      return true; // Show all complaints
    } else {
      return complaint.status === filterStatus; // Filter by selected status
    }
  });

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <section className="Main-Page">
      <div className="first-image"></div>
      <div className="main-heading text-center mt-8 text-4xl mb-4">
        Viewing All Received Complaints
      </div>
      <div className="text-center text-xl ">
        <label htmlFor="statusFilter" className="text-black">Filter by Status: &nbsp;</label>
        <select
          id="statusFilter"
          className="text-fuchsia-500	"
          value={filterStatus}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Resolved">Resolved</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
        </select>
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
            {filteredComplaints.map((complaint, index) => (
              <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                <td>{complaint._id}</td>
                <td>{complaint.date}</td>
                <td>{complaint.category}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${complaint.photo}`}
                    alt="complaint"
                    style={{ width: "5em", height: "5em" }}
                  />
                </td>
                <td className="complaint">{complaint.comment}</td>
                <td>
                  <select
                    className={`status ${selectedStatuses[complaint._id]
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                    value={selectedStatuses[complaint._id] || ""}
                    onChange={(e) =>
                      handleStatusChange(complaint._id, e.target.value)
                    }
                  >
                    {getStatusOptions(selectedStatuses[complaint._id])}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminDashboard;
