import React from "react";
import '../../styles/register.css'; // Import the CSS file

const RegisterForm = ({
  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  formErrors = {},
  handleChange,
  handleSubmit
}) => {
  return (
    <form id="registerForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Your Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {formErrors.confirmPassword && (
          <small className="text-danger">{formErrors.confirmPassword}</small>
        )}
      </div>
      <div className="form-group">
        <button type="submit" className="btn tokoTani-btn-primary btn-block" id="register">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
