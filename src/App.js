import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51I1nOeEomOUdbwLB0eKLHa6ngaOc0ZUElq8wCx5eBQPlxdEVyQaeAkGpjLx5A5wtdEOZkj6KNBvYXTp5GbGSIzfA00ZdUVXMnT"
);

function App() {
  // context api for state
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // observer that lets us know if user changes
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>>>>", authUser);

      if (authUser) {
        // the user just logged in/ user was logged in then
        dispatch({
          type: "SET_USER",
          user: authUser
        });
      } else {
        // the user is logged out then set to null
        dispatch({
          type: "SET_USER",
          user: null
        });
      }
      // like an if statement in React, empty [] means run once while app component loads
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            {/* using higher order function to wrap Payment */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
