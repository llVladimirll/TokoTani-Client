import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

export default function EarningsChart({ sellerId }) {
  const [earningsChart, setEarningsChart] = useState(null);

  useEffect(() => {
    async function initializeCharts() {
      try {
        const { labels: initialLabels, data: initialEarningsData } =
          await fetchData("monthly");

        const ctxEarnings = document.getElementById("earningsChart").getContext("2d");
        const chartInstance = createChart(
          ctxEarnings,
          initialEarningsData,
          initialLabels,
          "Earnings"
        );
        setEarningsChart(chartInstance);
      } catch (error) {
        console.error("Error initializing chart:", error);
      }
    }
    initializeCharts();
  }, []);

  async function fetchData(period) {
    try {
      const response = await axios.get(
        `https://toko-tani-server-2.vercel.app/api/sellers/earnings/${sellerId}?period=${period}`
      );

      const data = response.data;
      console.log("Raw response data:", data);

      if (!Array.isArray(data) || data.length === 0 || !data[0].period || !data[0].total) {
        // Return empty data if no valid data received
        return { labels: [], data: [] };
      }

      let labels = [];
      let earningsData = [];

      data.forEach((item) => {
        labels.push(item.period);
        earningsData.push(parseFloat(item.total));
      });

      console.log("Parsed labels and data:", { labels, earningsData });

      return { labels, data: earningsData };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Rethrow the error to be caught further up the chain if needed
    }
  }

  function createChart(ctx, data, labels, label) {
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: "rgba(163, 194, 80, 0.2)",
            borderColor: "rgba(163, 194, 80, 1)",
            borderWidth: 1,
            pointBackgroundColor: "rgba(163, 194, 80, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(163, 194, 80, 1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  async function updateChart(period) {
    try {
      const { labels, data } = await fetchData(period);

      // Update chart only if there's valid data
      if (earningsChart) {
        earningsChart.data.labels = labels;
        earningsChart.data.datasets[0].data = data;
        earningsChart.update();
      }

      document
        .querySelectorAll(".chart-period button")
        .forEach((btn) => btn.classList.remove("active"));

      const periodMap = {
        monthly: "btn-month",
        weekly: "btn-week",
        yearly: "btn-year",
      };

      document.getElementById(periodMap[period]).classList.add("active");
    } catch (error) {
      console.error("Error updating chart:", error);
    }
  }

  return (
    <div>
      <h2>Earnings</h2>
      <div className="chart-period">
        <button onClick={() => updateChart("monthly")} className="active" id="btn-month">
          Per Month
        </button>
        <button onClick={() => updateChart("weekly")} id="btn-week">
          Per Week
        </button>
        <button onClick={() => updateChart("yearly")} id="btn-year">
          Per Year
        </button>
      </div>
      <div className="chart-container">
        <canvas id="earningsChart"></canvas>
      </div>
    </div>
  );
}
