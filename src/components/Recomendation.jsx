import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Recommendation({ sellerId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await axios.get(
          `https://toko-tani-server-2.vercel.app/api/sellers/recomendations/${sellerId}`
        );
        console.log("recommendations", response.data);
        return response.data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    }

    async function displayRecommendations() {
      try {
        const data = await fetchRecommendations();
        setRecommendations(data.predictedPrices);
      } catch (error) {
        setError("Error displaying recommendations");
        console.error("Error displaying recommendations:", error);
      }
    }

    displayRecommendations();
  }, [sellerId]);

  return (
    <>
      <h2>Recommendation</h2>
      <div id="recommendation">
        {error ? (
          <p>{error}</p>
        ) : recommendations.length > 0 ? (
          recommendations.map((price, index) => (
            <h3 key={index}>{price}</h3>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      </>
  );
}
