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
        {/* placing the header here outside of the switch because it should be on every page */}
        {/* <Header /> */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
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
