import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ComplaintRegister.css";

const ComplaintRegister = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const { phoneId } = location.state || ""; // Retrieve phoneId from state
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}/${month}/${year}`;
  console.log(currentDate);

  const initialFormData = {
    category: "",
    othercategory: "",
    state: "",
    district: "",
    pincode: "",
    comment: "",
    photo: null,
    video: null,
    phoneId: phoneId, // Include phoneId in the initial form data
    status: "pending",
    likes: 0,
    date: currentDate,
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [commentsList, setCommentsList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category" && value !== "Other") {
      setFormData({ ...formData, [name]: value, othercategory: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = [
      "category",
      "state",
      "district",
      "pincode",
      "comment",
      "photo",
      "video",
    ];
    const allFieldsFilled = requiredFields.every(
      (field) => formData[field] !== "" && formData[field] !== null
    );

    const isOtherCategoryValid =
      formData.category !== "Other" ||
      (formData.category === "Other" && formData.othercategory !== "");

    if (allFieldsFilled && isOtherCategoryValid) {
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          if (formData[key] !== null) {
            formDataToSend.append(key, formData[key]);
          }
        }

        console.log("Form Data to Send:", formDataToSend);

        await axios.post(
          "http://localhost:5000/api/complaints",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setCommentsList([...commentsList, formData.comment]);
        setFormData({ ...initialFormData });
        window.alert("Complaint Registered");
      } catch (error) {
        console.error("Error registering complaint:", error);
        window.alert("Error registering complaint");
      }
    } else {
      window.alert("Please fill out all fields");
    }
  };

  const renderPreview = (file, type) => {
    if (!file) return null;
    const url = URL.createObjectURL(file);

    if (type === "photo") {
      return (
        <img
          src={url}
          alt="Preview"
          style={{ maxWidth: "200px", maxHeight: "200px" }}
        />
      );
    } else if (type === "video") {
      return (
        <video
          src={url}
          controls
          style={{ maxWidth: "200px", maxHeight: "200px" }}
        />
      );
    }
  };

  const handleReset = () => {
    setFormData({ ...initialFormData });
    document.getElementById("photo").value = "";
    document.getElementById("video").value = "";
    window.alert("Form Reset");
  };

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

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      district: "",
      pincode: "",
    });
  };

  return (
    <>
      <section className="main-page">
        <div className="form mb-4">
          <form onSubmit={handleSubmit}>
            <div className="form-row1">
              <label
                htmlFor="category"
                className="text-black rightspace font-bold"
              >
                Category of Complaint:<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="category"
                name="category"
                className="input-text"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">---Select---</option>
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
            {formData.category === "Other" && (
              <div className="form-row1 text-black rightspace">
                <label htmlFor="othercategory">
                  If others enter the category
                </label>
                <input
                  type="text"
                  name="othercategory"
                  className="input-text"
                  id="othercategory"
                  value={formData.othercategory}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="form-row1">
              <label
                htmlFor="state"
                className="text-black rightspace font-bold"
              >
                State:<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="state"
                name="state"
                className="input-text"
                value={formData.state}
                onChange={handleStateChange}
                required
              >
                <option value="">---Select---</option>
                {Object.keys(stateData).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row1 ">
              <label
                htmlFor="district"
                className="text-black rightspace font-bold"
              >
                District:<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="district"
                name="district"
                className="input-text"
                value={formData.district}
                onChange={handleChange}
                required
              >
                <option value="">---Select---</option>
                {stateData[formData.state]?.districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row1">
              <label
                htmlFor="pincode"
                className="text-black rightspace font-bold"
              >
                Pincode:<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="pincode"
                name="pincode"
                className="input-text"
                value={formData.pincode}
                onChange={handleChange}
                required
              >
                <option value="">---Select---</option>
                {stateData[formData.state]?.pinCodes.map((pincode) => (
                  <option key={pincode} value={pincode}>
                    {pincode}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row1">
              <label
                htmlFor="comment"
                className="text-black rightspace font-bold"
              >
                Comment:<span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="comment"
                name="comment"
                className="input-text"
                value={formData.comment}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row1">
              <label
                htmlFor="photo"
                className="text-black rightspace font-bold"
              >
                Photo:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                className="mt-4"
                onChange={handleFileChange}
                required
              />
              {renderPreview(formData.photo, "photo")}
            </div>
            <div className="form-row1">
              <label
                htmlFor="video"
                className="text-black rightspace font-bold"
              >
                Video:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="file"
                id="video"
                className="mt-4 mb-4"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
                required
              />
              {renderPreview(formData.video, "video")}
            </div>
            <div className="form-buttons flex justify-around text-blue-600 mt-8">
              <button type="submit" className="font-bold button-one">
                Submit
              </button>
              <button type="button" onClick={handleReset} className=" reset ">
                Reset
              </button>
              <button
                className="text-blue-800"
                onClick={() =>
                  Navigate("/dashboard", { state: { phoneId: phoneId } })
                }
              >
                Return to dashboard
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ComplaintRegister;
