import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ComplaintRegister.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ComplaintRegister = () => {
  const navigate = useNavigate();
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
    setFormData({ ...formData, [name]: value });
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
          `${BASE_URL}/api/complaints`,
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

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      district: "",
      pincode: "",
    });
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setFormData({
      ...formData,
      district: selectedDistrict,
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
            <div className="form-row1">
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
                onChange={handleDistrictChange}
                required
              >
                <option value="">---Select---</option>
                {formData.state &&
                  Object.keys(stateData[formData.state]).map((district) => (
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
                {formData.state &&
                  formData.district &&
                  stateData[formData.state][formData.district]?.map(
                    (pincode) => (
                      <option key={pincode} value={pincode}>
                        {pincode}
                      </option>
                    )
                  )}
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
                Video:
              </label>
              <input
                type="file"
                id="video"
                className="mt-4 mb-4"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
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
                  navigate("/dashboard", { state: { phoneId: phoneId } })
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
