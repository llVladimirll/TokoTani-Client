import React from "react";
import OrderSummary from "./OrderSummary";
import OrderDetails from "./OrderDetails";

const OrderCard = ({ order, toggleDetails }) => {
  const handleClick = () => {
    toggleDetails(order.order_id); // Pass order_id or index as needed
  };

  return (
    <div className="order-box" onClick={handleClick}>
      <OrderSummary order={order} />
      <div className="order-details" style={{ display: order.showDetails ? "flex" : "none" }}>
        <OrderDetails orderItems={order.order_items} />
      </div>
    </div>
  );
};

export default OrderCard;
