import React from "react";
import EditButton from "./button/EditButton";
import DeleteButton from "./button/DeleteButton";

export default function SellerProductCard({ product }) {
  

  const handleDelete = () => {
    // Handle delete action
    console.log("Delete product:", product);
  };

  return (
    <div className="special-order-item">
      <img src={product.picture_path} alt={product.name} />
      <div className="special-order-details">
        <h5>{product.name}</h5>
        <p>{product.price}</p>
      </div>
      <div className="special-order-actions">
        <EditButton productId={product.id}/>
        <DeleteButton productId={product.id} />
      </div>
    </div>
  );
}
