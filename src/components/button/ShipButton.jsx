import React from "react";
import axios from "axios";

export default function ShipButton({ orderId }) {
    const handleShipButtonClick = async () => {
        try {
          const response = await axios.patch(
            `https://toko-tani-server-2.vercel.app/api/sellers/ship/${orderId}`,
            {}  // Empty object as request body
          );
          alert(response.data.message); 
          window.location.reload();
        } catch (error) {
          console.error("Error updating order status:", error);
          alert("Failed to update order status."); // Alert user if API call fails
        }
      };
      

  return (
    <button
      className="ship-button btn btn-primary"
      onClick={handleShipButtonClick}
    >
      Ship Products
    </button>
  );
}
