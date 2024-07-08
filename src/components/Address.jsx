import React, { useState, useEffect } from "react";
import axios from "axios";
import AddressForm from "./form/AddressForm";

export default function Address({ userId, onAddressSelect }) {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`https://toko-tani-server-2.vercel.app/api/users/address/${userId}`);
        if (response.data && Array.isArray(response.data)) {
          setAddresses(response.data);
        } else {
          console.error("Invalid or empty addresses response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
  };

  const handleSelectChange = (event) => {
    const selectedAddressId = event.target.value;
    if (onAddressSelect) {
      onAddressSelect(selectedAddressId);
    }
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <h5 className="mb-3">Select Shipping Address</h5>
        <select
          id="address-select"
          className="form-select mb-4"
          onChange={handleSelectChange}
        >
          {addresses.map((address, index) => (
            <option key={index} value={address.id}>
              {`${address.address_line1}, ${address.address_line2}, ${address.city}, ${address.province}, ${address.country}`}
            </option>
          ))}
        </select>
        <button
          className="btn btn-secondary mb-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#new-address-form"
        >
          Add New Address
        </button>
        <AddressForm userId={userId} onAddAddress={handleAddAddress} />
      </div>
    </div>
  );
}
