import React, { useState } from "react";
import axios from "axios";

const AddAddress = ({ userId }) => {
  const [formData, setFormData] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    province: "",
    postal_code: "",
    country: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3330/api/users/${userId}/address`, formData);
      alert("Address added successfully!");
      setFormData({
        address_line1: "",
        address_line2: "",
        city: "",
        province: "",
        postal_code: "",
        country: ""
      });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="address_line1" className="form-label">Address Line 1</label>
        <input
          type="text"
          className="form-control"
          id="address_line1"
          name="address_line1"
          value={formData.address_line1}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address_line2" className="form-label">Address Line 2</label>
        <input
          type="text"
          className="form-control"
          id="address_line2"
          name="address_line2"
          value={formData.address_line2}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="province" className="form-label">Province</label>
        <input
          type="text"
          className="form-control"
          id="province"
          name="province"
          value={formData.province}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postal_code" className="form-label">Postal Code</label>
        <input
          type="text"
          className="form-control"
          id="postal_code"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="country" className="form-label">Country</label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Address</button>
    </form>
  );
};

export default AddAddress;
