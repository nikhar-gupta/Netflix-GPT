import React, { useState } from "react";
import Header from "../components/Header";
import "./LoginPage.css";

const LoginPage = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = (e) => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="login-main">
      <Header />
      <form className="login-form">
        <h1>Sign In</h1>
        {!isSignInForm && <input type="text" placeholder="Full Name" />}
        <input type="email" placeholder="Email ID" />
        <input type="password" placeholder="Password" />
        {!isSignInForm && (
          <input type="password" placeholder="Confirm Password" />
        )}
        <input type="submit" value="Sign In" id="submit-form" />
        <p className="new-user">
          {isSignInForm ? "New to Netflix?" : "Already a Member?"}{" "}
          <a onClick={toggleSignInForm}>
            {isSignInForm ? "Sign Up Now" : "Sign In"}
          </a>{" "}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
