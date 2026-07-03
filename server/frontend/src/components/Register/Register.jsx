import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        email,
      }),
    });

    const json = await res.json();
    if (json.status === "Authenticated" || json.userName) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else {
      alert("The user could not be registered: " + (json.error || "Unknown error"));
    }
  };

  return (
    <div className="register_container">
      <form className="register_form" onSubmit={register}>
        <div className="input_container">
          <label>Username </label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label>First Name </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label>Last Name </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label>Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="register_button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;