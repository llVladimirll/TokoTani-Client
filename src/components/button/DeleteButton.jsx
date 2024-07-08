import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function DeleteButton({ productId, onDelete }) {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3330/api/products/${productId}`);
        onDelete(productId); // Notify parent component to update state
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
