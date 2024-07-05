import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EarningsOverview({ sellerId }) {
  const [totalEarnings, setTotalEarnings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTotalEarnings() {
      try {
        const response = await axios.get(
          `https://toko-tani-server-2.vercel.app/api/sellers/total/${sellerId}`
        );
        return response.data.totalEarnings; // Assuming your API returns an object with 'totalEarnings' field
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    }

    async function displayTotalEarnings() {
      try {
        const totalEarnings = await fetchTotalEarnings();
        const formattedTotalEarnings = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(totalEarnings);
        setTotalEarnings(formattedTotalEarnings);
      } catch (error) {
        setError("Error displaying total earnings");
        console.error("Error displaying total earnings:", error);
      }
    }

    displayTotalEarnings();
  }, [sellerId]);

  return (
    <div className="earnings-info">
      <h2>Earnings Overview</h2>
      <div className="earnings-details">
        <h1 id="totalEarnings">
          {error ? error : totalEarnings ? `Total Earnings: ${totalEarnings}` : "Loading..."}
        </h1>
      </div>
    </div>
  );
}
