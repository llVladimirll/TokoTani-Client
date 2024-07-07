import React, { useState } from "react";
import axios from "axios";


export default function AddressForm({ userId }) {
  const [addressData, setAddressData] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    province: "",
    postal_code: "",
    country: ""
  });

  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://toko-tani-server-2.vercel.app/api/users/address/${userId}`,
        {
          user_id: userId,
          address_line1: addressData.address_line1,
          address_line2: addressData.address_line2,
          city: addressData.city,
          province: addressData.province,
          postal_code: addressData.postal_code,
          country: addressData.country
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Address added successfully:", response.data);
      // Reload the page to fetch updated address list
      window.location.reload();
    } catch (error) {
      console.error("Error adding address:", error);
      // Optionally handle error, e.g., display an error message
    }
  };

  return (
    <div id="new-address-form" className="collapse">
      <form id="address-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="address_line1" className="form-label">Address Line 1</label>
          <input
            type="text"
            className="form-control"
            id="address_line1"
            placeholder="Enter address line 1"
            value={addressData.address_line1}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address_line2" className="form-label">Address Line 2</label>
          <input
            type="text"
            className="form-control"
            id="address_line2"
            placeholder="Enter address line 2"
            value={addressData.address_line2}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Enter city"
            value={addressData.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="province" className="form-label">Province</label>
          <input
            type="text"
            className="form-control"
            id="province"
            placeholder="Enter province"
            value={addressData.province}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postal_code" className="form-label">Postal Code</label>
          <input
            type="text"
            className="form-control"
            id="postal_code"
            placeholder="Enter postal code"
            value={addressData.postal_code}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            placeholder="Enter country"
            value={addressData.country}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add Address
        </button>
      </form>
    </div>
  );
}
