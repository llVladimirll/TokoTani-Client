import React, { useState } from "react";
import axios from "axios";
import CheckoutModal from "../modals/CheckoutModals"; // Assuming it's a singular modal component

export default function CheckoutButton({ checkedItems, userId, addressId }) {
  const [showModal, setShowModal] = useState(false);

  // Function to handle the checkout process
  const handleCheckout = async () => {
    // Define the checkout endpoint URL
    const checkoutEndpoint = `https://toko-tani-server-2.vercel.app/api/products/checkout/${userId}`;

    // Prepare the request payload with checked items and selected address ID
    const requestData = {
      items: checkedItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      address_id: addressId, // Include the selected address ID in the payload
    };

    try {
      const response = await axios.post(checkoutEndpoint, requestData);

      console.log("Checkout successful:", response.data);

      setShowModal(true); // Show modal on successful checkout
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <>
      <button
        className="btn border-secondary rounded-pill px-4 py-3 text-secondary text-uppercase mb-4 ms-4"
        type="button"
        id="checkout"
        onClick={handleCheckout}
        disabled={!addressId} // Disable button if no address is selected
      >
        Proceed to Checkout
      </button>
      {showModal && <CheckoutModal showModal={showModal} />}
    </>
  );
}
