import React from "react";

const OrderDetails = ({ orderItems }) => {
  // Function to format number to IDR currency without decimals
  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      {orderItems.map((item) => (
        <div key={item.product_id}>
          <img src={item.picture_path} alt="Product Image" />
          <p>Name: {item.product_name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {formatToIDR(item.price)}</p>
          <p>Total: {formatToIDR(item.price * item.quantity)}</p>
        </div>
      ))}
    </>
  );
};

export default OrderDetails;
