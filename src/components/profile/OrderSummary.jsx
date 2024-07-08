import React, { useState } from "react";
import axios from "axios";

const OrderSummary = ({ order, toggleDetails }) => {
  const [orderState, setOrderState] = useState(order);

  // Function to format number to IDR currency without decimals
  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await axios.patch(
        `https://toko-tani-server-2.vercel.app/api/users/order/${orderId}`,
        {}
      );
      alert(response.data.message); 
      window.location.reload();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="order-summary">
      <div className="order-info">
        <h3>Order ID: {orderState.order_id}</h3>
        <p>Date: {new Date(orderState.created_at).toLocaleString()}</p>
        <p>Status: {orderState.status}</p>
        <p>
          Address: {orderState.address_line1}, {orderState.address_line2 ? orderState.address_line2 + ", " : ""}
          {orderState.city}, {orderState.province}, {orderState.postal_code}, {orderState.country}
        </p>
        <p>
          Total: {formatToIDR(orderState.order_items.reduce((total, item) => total + item.price * item.quantity, 0))}
        </p>
      </div>
      <div className="order-actions">
        {orderState.status === "product is shipping" && (
          <button onClick={() => handleCompleteOrder(orderState.order_id)}>Complete Order</button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
