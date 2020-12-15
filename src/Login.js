import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input type="text" />
          <h5>Password</h5>
          {/* the type is password here to hide characters when typing */}
          <input type="password" />
          <button className="login__signInButton">Sign In</button>
        </form>
        <p>
          By signing-in you agree to the Brandon's Amazon Clone Conditions of
          Use & Sale. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>
        <button className="login__registerButton">Create An Account</button>
      </div>
    </div>
  );
}

export default Login;
