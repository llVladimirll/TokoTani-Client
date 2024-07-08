// components/CartItem.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function CartItem({ product, userId, onUpdateCart }) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.price);

  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.price * product.quantity);

  const handleQuantityIncrease = async () => {
    const newQuantity = product.quantity + 1;
    try {
      await axios.put(
        `https://toko-tani-server-2.vercel.app/api/products/cart/${userId}/${product.product_id}`,
        {
          quantity: newQuantity,
        }
      );
      onUpdateCart(); // Update cart items in parent component
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleQuantityDecrease = async () => {
    if (product.quantity > 1) {
      const newQuantity = product.quantity - 1;
      try {
        await axios.put(
          `https://toko-tani-server-2.vercel.app/api/products/cart/${userId}/${product.product_id}`,
          {
            quantity: newQuantity,
          }
        );
        onUpdateCart(); // Update cart items in parent component
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://toko-tani-server-2.vercel.app/api/products/cart/${userId}/${product.product_id}`
      );
      onUpdateCart(); // Update cart items in parent component
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="cart-item d-flex align-items-center p-3 border-bottom">
      <div className="form-check me-3">
        <input
          type="checkbox"
          className="form-check-input"
          name="select"
          value={product.product_id}
        />
      </div>
      <div className="cart-item-image me-3">
        <img
          src={product.picture_path}
          alt={product.name}
          style={{ width: "50px" }}
        />
      </div>
      <div className="cart-item-details flex-grow-1">
        <h5 className="cart-item-name mb-0">{product.name}</h5>
        <p className="cart-item-price mb-0">{formattedPrice}</p>
      </div>
      <div className="cart-item-quantity me-3 d-flex align-items-center">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={handleQuantityDecrease}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          type="number"
          className="form-control mx-2"
          value={product.quantity}
          readOnly
          style={{ width: "50px", textAlign: "center" }}
        />
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={handleQuantityIncrease}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="cart-item-total me-3">
        <p className="mb-0">{formattedTotal}</p>
      </div>
      <div className="cart-item-delete">
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
}
