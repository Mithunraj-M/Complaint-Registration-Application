import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const stateData = {
  "Tamil Nadu": {
    Chennai: ["600001", "600002", "600003", "600004"],
    Coimbatore: ["631027", "641013", "641005", "641005"],
    Madurai: ["625001", "625009", "625012", "625013"],
  },
  Karnataka: {
    Bangalore: ["560001", "560002", "560003"],
    Mysore: ["570001", "570002", "570003"],
    Hubli: ["580001", "580002", "580003"],
  },
  Maharashtra: {
    Mumbai: ["400001", "400002", "400003"],
    Pune: ["411001", "411002", "411003"],
    Nagpur: ["440001", "440002", "440003"],
  },
  "West Bengal": {
    Kolkata: ["700001", "700002", "700003"],
    Darjeeling: ["734101", "734102", "734103"],
    Howrah: ["711101", "711102", "711103"],
  },
  "Uttar Pradesh": {
    Lucknow: ["226001", "226002", "226003"],
    Kanpur: ["208001", "208002", "208003"],
    Varanasi: ["221001", "221002", "221003"],
  },
};

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    pincode: "",
  });

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFilters({
      state: selectedState,
      district: selectedState === "All" ? "" : filters.district,
      pincode: selectedState === "All" ? "" : filters.pincode,
    });
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFilters({
      ...filters,
      district: selectedDistrict,
      pincode: selectedDistrict === "All" ? "" : filters.pincode,
    });
  };

  const handlePincodeChange = (e) => {
    setFilters({
      ...filters,
      pincode: e.target.value,
    });
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        console.log("Fetching complaints with filters:", filters);
        const response = await axios.get(
          "http://localhost:5000/api/complaints",
          {
            params: filters,
          }
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
  }, [filters]);

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

  const navigate = useNavigate();

  return (
    <section className="Main-Page">
      <div>
      <div className="first-image"></div>
      <button className="logout-overlay" onClick={()=> navigate("/")}>Logout</button>
      </div>
      
      <div className="main-heading text-center mt-8 text-4xl ">
        Viewing All Received Complaints
      </div>
      <div className="form-row flex align-center justify-center">
        <select
          id="state"
          value={filters.state}
          onChange={handleStateChange}
          required
        >
          <option value="">---Select State---</option>
          <option value="All">All</option>
          {Object.keys(stateData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          id="district"
          value={filters.district}
          onChange={handleDistrictChange}
          required
        >
          <option value="">---Select District---</option>
          <option value="All">All</option>
          {filters.state &&
            stateData[filters.state] &&
            Object.keys(stateData[filters.state]).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </select>

        <select
          id="pincode"
          value={filters.pincode}
          onChange={handlePincodeChange}
          required
        >
          <option value="">---Select Pincode---</option>
          <option value="All">All</option>
          {filters.state &&
            filters.district &&
            stateData[filters.state] &&
            stateData[filters.state][filters.district] &&
            stateData[filters.state][filters.district].map((pincode) => (
              <option key={pincode} value={pincode}>
                {pincode}
              </option>
            ))}
        </select>
      </div>
      <div className="text-center text-xl">
        <label htmlFor="statusFilter" className="text-black">
          Filter by Status: &nbsp;
        </label>
        <select
          id="statusFilter"
          className="text-fuchsia-500"
          value={filterStatus}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Resolved">Resolved</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>
      <div className="mb-8">
        <table className="complaint-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Date</th>
              <th>Category</th>
              <th>Location</th>
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
                  <div>
                    {complaint.state}
                    <br></br>
                    {complaint.district}
                    <br></br>
                    {complaint.pincode}
                  </div>
                </td>
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
