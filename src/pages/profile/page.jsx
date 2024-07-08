import React, { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/jwtUtils";
import EditProfile from "../../components/profile/EditProfile";
import ViewAddresses from "../../components/profile/ViewAddress";
import ViewOrders from "../../components/profile/ViewOrder";
import Sidebar from "../../components/profile/Sidebar";
import '../../styles/profile.css'; // Import custom CSS for profile page
import Navbar from "../../components/navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("editProfile");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        // Redirect to login page if user is not authenticated
        navigate("/login");
        return;
      }

      try {
        const decodedToken = await decodeJwt(token);
        if (decodedToken) {
          setUserId(decodedToken.userID);
        } else {
          console.error("Invalid token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="profile-main-content">
          {activeTab === "editProfile" && <EditProfile userId={userId} />}
          {activeTab === "viewAddresses" && <ViewAddresses userId={userId} />}
          {activeTab === "viewOrders" && <ViewOrders userId={userId} />}
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
