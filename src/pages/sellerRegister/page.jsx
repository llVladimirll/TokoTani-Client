import React, { useState, useEffect } from "react";
import SellerForm from "../../components/form/SellerForm";
import { decodeJwt } from "../../utils/jwtUtils";

function SellerPage() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const decodedToken = decodeJwt(userToken);
    if (decodedToken) {
      setUserId(decodedToken.userID);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <SellerForm userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
