import React, { createContext, useContext, useReducer } from "react";

// prepares the data Layer
export const StateContext = createContext();

// Wrap our app and provide the data Layer to every component inside our app
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pulls information from the data layer
export const useStateValue = () => useContext(StateContext);
