import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "./firebase";

function Login() {
  // history will let us programmatically change URL
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = event => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        history.push("/");
      })
      .catch(error => alert(error.message));

    // firebase login happens here
  };
  const Register = event => {
    event.preventDefault();
    // this is creating a user with email and password using state from above
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(
        // if successful, take the object it gives us and console.log that info,
        auth => {
          console.log(auth);
          //  then redirect user to home
          if (auth) {
            history.push("/");
          }
        }
      )
      // if theres an error alert why
      .catch(error => alert(error.message));

    // firebase register happens here
  };

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
          <input
            type="text"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <h5>Password</h5>
          {/* the type is password here to hide characters when typing */}
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button
            onClick={signIn}
            type="submit"
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the Brandon's Amazon Clone Conditions of
          Use & Sale. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>
        <button
          onClick={Register}
          type="submit"
          className="login__registerButton"
        >
          Create An Account
        </button>
      </div>
    </div>
  );
}

export default Login;
