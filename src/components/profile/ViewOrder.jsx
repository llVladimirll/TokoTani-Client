import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "./OrderCard";
import '../../styles/order.css'

const ViewOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3330/api/users/orders/${userId}`);
      const ordersWithDetails = response.data.map(order => ({
        ...order,
        showDetails: false  // Initialize showDetails for each order
      }));
      setOrders(ordersWithDetails);
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

  const toggleDetails = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.order_id === orderId ? { ...order, showDetails: !order.showDetails } : order
    );
    setOrders(updatedOrders);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="profile-main-content">
      <header className="orders-header">
        <h2>Orders</h2>
      </header>
      <section className="orders-list">
        {orders.map(order => (
          <OrderCard
            key={order.order_id}
            order={order}
            toggleDetails={() => toggleDetails(order.order_id)}
          />
        ))}
      </section>
    </main>
  );
};

export default ViewOrders;
