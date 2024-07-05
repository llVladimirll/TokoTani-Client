import React from "react";

const LoginForm = ({
  formData = {
    email: '',
    password: ''
  },
  formErrors = {},
  handleChange,
  handleSubmit
}) => {
  return (
    <form id="loginForm" onSubmit={handleSubmit}>
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
        <button type="submit" className="btn tokoTani-btn-primary btn-block" id="login">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
