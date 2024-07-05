import React, { useEffect, useState } from "react";
import Recommendation from "../../components/Recomendation";
import EarningsOverview from "../../components/TotalEarnings";
import EarningsChart from "../../components/EarningsChart";
import { decodeJwt } from "../../utils/jwtUtils";
import SellerNavbar from "../../components/navbar/SellerNavbar";

function DashboardPage() {
  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (token) {
      const decodedToken = decodeJwt(token);
      const id = decodedToken?.SellerID; 
      if (id) {
        setSellerId(id);
      } else {
        console.error("Seller ID not found in the token");
      }
    } else {
      console.error("Seller token not found in localStorage");
    }
  }, []);

  if (!sellerId) {
    return <p>Loading...</p>;
  }

  return (
    <>
  <div className="seller-navbar-wrapper">
    <SellerNavbar />
  </div>
  <div className="main-content">
    <EarningsOverview sellerId={sellerId}/>
    <div className="earnings-chart">
      <EarningsChart sellerId={sellerId} />
    </div>
    <div className="earnings-chart">
      <Recommendation sellerId={sellerId}/>
    </div>
  </div>
</>

  );
}

export default DashboardPage;
