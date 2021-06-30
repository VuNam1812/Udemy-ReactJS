// @flow
import React, { useReducer } from "react";
import { reducer } from "./reducer";
export const authContext = React.createContext();

const initData = {
  auth: false,
  account: {},
};

export const AuthProvider = ({ children }) => {
  const [store_auth, dispatch_auth] = useReducer(reducer, initData);

  const exportContext = {
    store_auth,
    dispatch_auth,
  };

  return (
    <authContext.Provider value={exportContext}>
      {children}
    </authContext.Provider>
  );
};
