import React from "react";


const SellerOrder = ({ order }) => {
  const totalAmount = order.order_items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <tr>
      <td>
        <ul className="order-items">
          {order.order_items.map((item) => (
            <li key={item.product_id}>
              <img
                src={item.picture_path}
                alt={item.product_name}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
              {item.product_name}
            </li>
          ))}
        </ul>
      </td>
      <td>Rp {totalAmount.toLocaleString("id-ID")}</td>
      <td>{order.status}</td>
      <td>
        {order.status === "payment_complete" && (
          <>
            <In order={order} />
          </>
        )}
      </td>
    </tr>
  );
};

export default SellerOrder;
