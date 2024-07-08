import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function DeleteButton({ productId }) {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        await axios.delete(`https://toko-tani-server-2.vercel.app/api/sellers/product/${productId}`);
        window.location.reload(); // Corrected: Invoke the function to reload the page
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <button className="action-button" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
}
