import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = ({ userId }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://toko-tani-server-2.vercel.app/api/users/${userId}`);
        const { name, email } = response.data;
        setFormData({ name, email });
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving user:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://toko-tani-server-2.vercel.app/api/users/${userId}`, formData);
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="profile-main-content">
      <header className="profile-header">
        <h2>Profile</h2>
        {!editing && (
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        )}
        {editing && (
          <button className="save-button" onClick={handleSubmit}>
            Save
          </button>
        )}
      </header>
      <section className="profile-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!editing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!editing}
            />
          </div>
          <div className="form-group password">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              readOnly={!editing}
            />
          </div>
          {editing && (
            <button type="submit" className="save-button">
              Save
            </button>
          )}
        </form>
      </section>
    </main>
  );
};

export default EditProfile;
