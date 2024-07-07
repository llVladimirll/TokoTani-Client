import React from "react";
import InvoicePDF from "./InvoicePdf";
import ShipButton from "./button/ShipButton";

const SellerOrder = ({ order }) => {
  const totalAmount = order.order_items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Create a new order object with totalAmount included
  const updatedOrder = {
    ...order,
    totalAmount,
  };

  return (
    <tr>
      <td>
        <div style={{ marginBottom: "10px" }}>
          <strong>Buyer:</strong> {order.user_name}
        </div>
        <ul className="order-items" style={{ listStyleType: "none", padding: 0 }}>
          {order.order_items.map((item) => (
            <li
              key={item.product_id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={item.picture_path}
                alt={item.product_name}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  marginRight: "10px",
                  borderRadius: "5px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold" }}>{item.product_name}</div>
                <div>Qty: {item.quantity}</div>
                <div>
                  Price: Rp {item.price.toLocaleString("id-ID")}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </td>
      <td>Rp {totalAmount.toLocaleString("id-ID")}</td>
      <td>{order.status}</td>
      <td style={{ textAlign: "center" }}>
        {order.status === "payment_complete" && (
          <div style={{ display: "inline-block", textAlign: "center" }}>
            <div style={{ marginBottom: "10px" }}>
              <InvoicePDF order={updatedOrder} />
            </div>
            <div>
              <ShipButton orderId={order.order_id} />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default SellerOrder;
