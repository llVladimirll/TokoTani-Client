import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function EditButton({ productId }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/seller/edit-product/${productId}`);
  };

  return (
    <button className="action-button" onClick={handleEdit}>
      <FontAwesomeIcon icon={faPencilAlt} />
    </button>
  );
}
