import React, { useState } from "react";
import Navbar from "./Navbar";
import casroyImage from "../assets/casroy.jpg";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Button from "./Button";

const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
  };

  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
    setLoggedInUsername(username);
    setShowLoginForm(false);
    setShowSignUpForm(false);
  };

  return (
    <div>
      <Navbar />
      <br></br>
      {!isLoggedIn && (
        <div className="container d-flex justify-content-center align-items-center min-vh-10">
          <Button onClick={handleLoginClick}>Login</Button>
          <Button onClick={handleSignUpClick}>Sign Up</Button>
        </div>
      )}

      {!isLoggedIn && showLoginForm && (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
      {!isLoggedIn && showSignUpForm && <SignUpForm />}

      {isLoggedIn && (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1200px",
            padding: "20px",
          }}
        >
          <h1>Welcome Back, {loggedInUsername}!</h1>
          <h5>
            Enjoy our Poker Ledger app, and have fun reliving your past games!
          </h5>
          <img src={casroyImage} className="d-block w-100" alt="Image 1"></img>
        </div>
      )}
    </div>
  );
};

export default Home;
