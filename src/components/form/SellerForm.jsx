import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SellerForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    location: "",
    phoneNumber: "",
    sellerImage: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+62")) {
      value = "+62" + value.replace(/^(\+62|62|0)/, "");
    }
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, sellerImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      if (key === "phoneNumber") {
        formDataObj.append(key, formData[key].replace("+", ""));
      } else {
        formDataObj.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        `https://toko-tani-server-2.vercel.app/api/sellers/${userId}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Seller registered:", response.data);

      const { sellerToken } = response.data;

      localStorage.setItem("sellerToken", sellerToken);

      navigate("/");
    } catch (error) {
      console.error("Error registering seller:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="shadow-lg p-3 mb-5 bg-body rounded">
        <div className="card-header">
          <h3 className="text-center mb-4">Seller Registration</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Store Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="info" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="info"
                name="info"
                value={formData.info}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <select
                className="form-select"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a location</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Malang">Malang</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Semarang">Semarang</option>
                <option value="Bandung">Bandung</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="+62"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sellerImage" className="form-label">Store Photo</label>
              <input
                type="file"
                className="form-control"
                id="sellerImage"
                name="sellerImage"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">Register Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerForm;
