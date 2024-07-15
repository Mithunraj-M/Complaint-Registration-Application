import axios from "axios"; // Import axios for HTTP requests
import React, { useEffect, useState } from "react";
import like_img from "./Assets/Icons/thumbs.jpg";
import "./ComplaintView.css";

const ComplaintView = () => {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    category: "",
  });

  const [complaints, setComplaints] = useState([]);

  const stateData = {
    "Tamil Nadu": {
      districts: ["Chennai", "Coimbatore", "Madurai"],
      pinCodes: ["600001", "641001", "625001"],
    },
    Karnataka: {
      districts: ["Bangalore", "Mysore", "Hubli"],
      pinCodes: ["560001", "570001", "580001"],
    },
    Maharashtra: {
      districts: ["Mumbai", "Pune", "Nagpur"],
      pinCodes: ["400001", "411001", "440001"],
    },
    "West Bengal": {
      districts: ["Kolkata", "Darjeeling", "Howrah"],
      pinCodes: ["700001", "734101", "711101"],
    },
    "Uttar Pradesh": {
      districts: ["Lucknow", "Kanpur", "Varanasi"],
      pinCodes: ["226001", "208001", "221001"],
    },
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints"
        );
        const fetchedComplaints = response.data;

        const filteredComplaints = fetchedComplaints.filter(
          (complaint) =>
            (!formData.state || complaint.state === formData.state) &&
            (!formData.district || complaint.district === formData.district) &&
            (!formData.category || complaint.category === formData.category)
        );

        setComplaints(filteredComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [formData]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      district: "",
      category: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLike = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/complaints/${id}/likes`
      );
      const updatedLike = response.data.updatedLike;
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id
            ? { ...complaint, likes: updatedLike.likes }
            : complaint
        )
      );

      console.log("Updated the likes");
    } catch (error) {
      console.log("could not update", error);
    }
  };
  return (
    <div>
      <div className="form-row">
        <select
          id="state1"
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          required
        >
          <option value="">---Select State---</option>
          {Object.keys(stateData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          id="district"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        >
          <option value="">---Select District---</option>
          {stateData[formData.state]?.districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">---Select Category---</option>
          <option value="Road Issues">Road Issues</option>
          <option value="Electricity Issues">Electricity Issues</option>
          <option value="Drainage Issues">Drainage Issues</option>
          <option value="Sanitary Issues">Sanitary Issues</option>
          <option value="Water Supply Issues">Water Supply Issues</option>
          <option value="Waste Management">Waste Management</option>
          <option value="Public Safety">Public Safety</option>
          <option value="Street Lighting">Street Lighting</option>
          <option value="Traffic Management">Traffic Management</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <h2 className="complaints-header">Complaints</h2>
      <div className="complaints-list">
        {complaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          <div className="complaints-container">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="complaint-box">
                <div className="complaint-header">
                  <p> {complaint.state}</p>
                  <p> {complaint.district}</p>
                </div>
                <h3 id="complaint-title">{complaint.category}</h3>
                <div className="complaint-content">
                  <img
                    src={`http://localhost:5000/${complaint.photo}`}
                    alt="Complaint"
                    className="complaint-image"
                  />
                  <p>{complaint.comment}</p>
                </div>
                <div className="complaint-footer">
                  <button
                    className="like-button"
                    onClick={() => handleLike(complaint._id)}
                  >
                    <img src={like_img} id="like" alt="Like" />
                  </button>
                  <span className="like-count">
                    {complaint.likes || 0} people
                  </span>
                  <p className="complaint-date">{complaint.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintView;
