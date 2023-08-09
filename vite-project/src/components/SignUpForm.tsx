import React, { useState } from "react";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSubmit = (e: any) => {
    const userCreate = {
      userID: 0,
      username: username,
      password: password,
    };

    const url = "https://localhost:7157/create-user";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        if (responseFromServer) {
          setShowSuccessAlert(true);
          setShowErrorAlert(false);
        } else {
          setShowErrorAlert(true);
          setShowSuccessAlert(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-40">
      <div className="card p-4">
        <h2 className="mb-4">Sign Up</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Choose a username"
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
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary w-100">
          Sign Up
        </button>

        {showSuccessAlert && (
          <div className="alert alert-success mt-3" role="alert">
            Success! Please login now {username}
          </div>
        )}

        {showErrorAlert && (
          <div className="alert alert-danger mt-3" role="alert">
            Username is already taken.
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUpForm;
