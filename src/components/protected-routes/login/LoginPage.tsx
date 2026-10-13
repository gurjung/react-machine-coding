import React, { useRef } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { login } from "../utils";

const LoginPage = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // validation
    login();
    console.log(emailRef.current?.value, "ref");
    navigate("/home", { replace: true });
  };

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit}
      aria-labelledby="login-heading"
    >
      <h2 id="login-heading">LOGIN PAGE</h2>
      {/* email */}
      <div className="form-input-container">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          ref={emailRef}
          placeholder="Enter your email"
          className="form-input-box"
        />
      </div>
      {/* password */}
      <div className="form-input-container">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="form-input-box"
        />
      </div>
      {/* submit button */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
