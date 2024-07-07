import React, { useState, useEffect } from "react";
import axios from "axios";


const ViewOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3330/api/users/orders/${userId}`);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const completeOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:3330/api/orders/${orderId}/complete`);
      console.log("Order completed successfully:", response.data);
      // Refresh orders after completing order
      fetchOrders();
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order.id} className="list-group-item">
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Status:</strong> {order.status}<br />
              <strong>Total:</strong> {order.total}<br />
              <strong>Items:</strong>
              <ul>
                {order.items ? (
                  order.items.map((item) => (
                    <li key={item.product_id}>
                      {item.product_name} - Quantity: {item.quantity}
                    </li>
                  ))
                ) : (
                  <p>No items found.</p>
                )}
              </ul>
              {order.status === "shipping product" && (
                <button
                  className="btn btn-primary"
                  onClick={() => completeOrder(order.id)}
                >
                  Complete Order
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewOrders;
