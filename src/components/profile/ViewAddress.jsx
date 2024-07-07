import React, { useEffect, useState } from "react";
import axios from "axios";
import AddressCard from "../AddressCard";

const ViewAddresses = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // Using a named async function to separate the logic for clarity
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

  if (loading) {
    return <p>Loading...</p>; // Placeholder for loading state
  }

  if (error) {
    return <p>{error}</p>; // Display error message if there is an error
  }

  return (
    <div className="custom-row" style={{ width: '100%' }}>
      <main className="main-content custom-main-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="address-info custom-address-info">
          <h1 className="custom-address-info-title">Address Information</h1>
          <div className="address-list">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <AddressCard key={address.id} address={address} />
              ))
            ) : (
              <p>No addresses found.</p> // Display a message if there are no addresses
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewAddresses;
