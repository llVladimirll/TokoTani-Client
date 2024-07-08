import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/form/RegisterForm";
import LoginForm from "../../components/form/LoginForm";
import Slideshow from "../../components/Slideshow";
import { decodeJwt } from "../../utils/jwtUtils";

const RegisterPage = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const isLogin = location.pathname === '/login'; 

  const [formData, setFormData] = useState(
    isLogin
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" }
  );

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
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
    setFormErrors({
      ...formErrors,
      [name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      console.log('Server response:', response.data);

      if (isLogin) {
        const { userToken, sellerToken } = response.data;

        console.log('User token:', userToken);
        console.log('Seller token:', sellerToken);

        localStorage.setItem("userToken", userToken);
        const token = localStorage.getItem("userToken");
        const decodedToken = decodeJwt(token);
        if (decodedToken.isSeller){
          localStorage.setItem("sellerToken", sellerToken);
        }

        console.log("Login successful:", response.data);
        navigate('/');
      } else {
        console.log("Registration successful:", response.data);
        navigate('/login'); // Redirect to login after successful registration
      }
    } catch (error) {
      console.error(isLogin ? "Error logging in user:" : "Error registering user:", error);
    }

    setFormData(
      isLogin
        ? { email: "", password: "" }
        : { name: "", email: "", password: "", confirmPassword: "" }
    );
  };

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
