import React, { useEffect, useState } from "react";
import axios from "axios";
import AddressCard from "./AddressCard.jsx";

const ViewAddresses = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [showModal, setShowModal] = useState(false); // State for controlling the modal

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:3330/api/users/address/${userId}`);
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setError("Failed to load addresses."); // Set error state if there is a problem
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchAddresses();
  }, [userId]); // Adding userId as a dependency to refetch if it changes

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newAddress = {
      address_line1: form.address_line1.value,
      address_line2: form.address_line2.value,
      city: form.city.value,
      province: form.province.value,
      postal_code: form.postal_code.value,
      country: form.country.value,
    };

    try {
      const response = await axios.post(`http://localhost:3330/api/users/address/${userId}`, {
        userId,
        ...newAddress,
      });
      setAddresses([...addresses, response.data]);
      setShowModal(false); // Close the modal after adding the address
    } catch (error) {
      console.error("Error adding address:", error);
      setError("Failed to add address.");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Placeholder for loading state
  }

  if (error) {
    return <p>{error}</p>; // Display error message if there is an error
  }

  return (
    <div>
      <div className="address-header">
        <h2>Address</h2>
        <button className="add-address" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus"></i> Add new address
        </button>
      </div>
      <div className="address-list">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Address</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAddAddress}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="address_line1" className="form-label">Address Line 1</label>
                    <input type="text" className="form-control" id="address_line1" name="address_line1" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address_line2" className="form-label">Address Line 2</label>
                    <input type="text" className="form-control" id="address_line2" name="address_line2" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="province" className="form-label">Province</label>
                    <input type="text" className="form-control" id="province" name="province" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="postal_code" className="form-label">Postal Code</label>
                    <input type="text" className="form-control" id="postal_code" name="postal_code" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" id="country" name="country" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button type="submit" className="btn btn-primary">Save Address</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAddresses;
