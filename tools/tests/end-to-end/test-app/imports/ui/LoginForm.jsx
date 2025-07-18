import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    

    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        setError("Incorrect username or password!");
      } else {
        setError("");
      }
    });
  };

   return (
    <form onSubmit={submit} className="login-form">
      {error && <div style={{fontWeight: "bold", color: "red", marginBottom: 8 }}>{error}</div>}
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
    </form>
  );
};