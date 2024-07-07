import React, { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/jwtUtils";
import EditProfile from "../../components/profile/EditProfile";
import ViewAddresses from "../../components/profile/ViewAddress";
import AddAddress from "../../components/profile/AddAddress";
import ViewOrders from "../../components/profile/ViewOrder";
import '../../styles/profile.css'; // Import custom CSS

const ProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("editProfile");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        const decodedToken = await decodeJwt(token);
        if (decodedToken) {
          setUserId(decodedToken.userID);
        } else {
          throw new Error("Invalid token");
        }
      } else {
        throw new Error("No token found");
      }
    };

    fetchUserData();
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = [
    { id: "editProfile", label: "Edit Profile", component: EditProfile },
    { id: "viewAddresses", label: "View Addresses", component: ViewAddresses },
    { id: "addAddress", label: "Add Address", component: AddAddress },
    { id: "viewOrders", label: "View Orders", component: ViewOrders },
  ];

  return (
    <div className="container mt-5 profile-page">
      <div className="row">
        <div className="col-md-3">
          <nav>
            <div className="nav flex-column nav-pills">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
        <div className="col-md-9">
          <div className="tab-content">
            {tabs.map((tab) =>
              activeTab === tab.id ? (
                <tab.component key={tab.id} userId={userId} />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
