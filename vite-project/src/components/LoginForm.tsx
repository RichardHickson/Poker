import React, { useState } from "react";
import Alert from "./Alert";

function LoginForm({ onLoginSuccess }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const url =
      "https://pokerledger-server.azurewebsites.net/get-user?username=" +
      username;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      });

      const user = await response.json();

      if (user.username === username && user.password === password) {
        onLoginSuccess(username);
        console.log("Success");
      } else {
        console.log("Incorrect");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  function getName() {
    const url = "https://localhost:7157/get-user";

    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((user) => {
        if (user.username == username && user.password == password) {
          <Alert onClose={() => {}}>Login Success!</Alert>;
        } else {
          <Alert onClose={() => {}}>Username or Password incorrect!</Alert>;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-40">
      <div className="card p-4">
        <h2 className="mb-4">Login</h2>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary w-100">
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
