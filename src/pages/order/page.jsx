import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerOrder from "../../components/SellerOrder";
import SellerNavbar from "../../components/navbar/SellerNavbar"
import { decodeJwt } from "../../utils/jwtUtils";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          `https://toko-tani-server-2.vercel.app/api/sellers/orders/${sellerId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    if (sellerId) {
      fetchOrders();
    }
  }, [sellerId]);

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    const decodedToken = decodeJwt(token);
    if (decodedToken) {
      setSellerId(decodedToken.SellerID);
    }
  }, []);

  return (
    <>
    <SellerNavbar />
    <div className="container-fluid py-5" style={{ backgroundColor: "rgb(250, 245, 226)" }}>
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-12">
            <div className="main-content" style={{ backgroundColor: "#faf5e2", padding: "20px", borderRadius: "10px" }}>
              <div
                className="section text-address mb-4"
                style={{ border: "1px solid #515604", backgroundColor: "rgb(250, 245, 226)", padding: "10px", borderRadius: "5px" }}
              >
                <h2>Pesanan Saya</h2>
              </div>
              <div
                className="section table-responsive"
                style={{ border: "1px solid #515604", backgroundColor: "rgb(250, 245, 226)", padding: "10px", borderRadius: "5px" }}
              >
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Products</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="section orders">
                    {orders.map((order) => (
                      <SellerOrder key={order.order_id} order={order} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
