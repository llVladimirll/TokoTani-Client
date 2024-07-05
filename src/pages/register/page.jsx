import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/form/RegisterForm";
import LoginForm from "../../components/form/LoginForm"; // Import LoginForm
import Slideshow from "../../components/Slideshow";

const RegisterPage = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const isLogin = location.pathname === '/login'; // Check if the current path is /login

  const [formData, setFormData] = useState(
    isLogin
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" }
  );

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Clear form data when the path changes
    setFormData(
      isLogin
        ? { email: "", password: "" }
        : { name: "", email: "", password: "", confirmPassword: "" }
    );
    setFormErrors({});
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear previous error message on change
    setFormErrors({
      ...formErrors,
      [name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        isLogin
          ? "https://toko-tani-server-2.vercel.app/api/users/login"
          : "https://toko-tani-server-2.vercel.app/api/users/register",
        formData
      );

      if (isLogin) {
        const { userToken, sellerToken } = response.data; // Assuming the response contains the role

        localStorage.setItem("userToken", userToken);
        localStorage.setItem("sellerToken", sellerToken);
        
        console.log("Login successful:", response.data);
        navigate('/');
      } else {
        console.log("Registration successful:", response.data);
        // Optionally handle registration success (e.g., show a success message, redirect)
      }
    } catch (error) {
      console.error(isLogin ? "Error logging in user:" : "Error registering user:", error);
      // Optionally handle error (e.g., show an error message)
    }

    // Clear the form after submission
    setFormData(
      isLogin
        ? { email: "", password: "" }
        : { name: "", email: "", password: "", confirmPassword: "" }
    );
  };

  // Basic client-side validation
  const validateForm = (data) => {
    const errors = {};
    if (!isLogin && !data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (!isLogin && data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!isLogin && data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="tokoTani-register-container">
            <div className="tokoTani-register-header">
              <p>{isLogin ? "Sign In" : "Register"}</p>
            </div>
            {isLogin ? (
              <LoginForm
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : (
              <RegisterForm
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
            <div className="text-center">
              <p>
                {isLogin ? (
                  <>
                    Don't have an account? <Link to="/register">Sign up</Link>.
                  </>
                ) : (
                  <>
                    Already have an account? <Link to="/login">Sign in</Link>.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 tokoTani-container2 d-none d-lg-block">
          <Slideshow />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
