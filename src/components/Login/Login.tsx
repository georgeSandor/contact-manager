import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import contactImg from '../../assets/images/contact.svg';
import "./Login.scss";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Email or password does not match. Please try again.");
    } else {
      setError("");
      navigate("/main");
    }
  };

  return (
    <div className="login-container">
      <img src={contactImg} className="contact-img" width={100} height={100} />
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">User:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button className="login-btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
