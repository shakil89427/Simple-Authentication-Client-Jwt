import React, { createContext } from "react";
import Authentication from "./Authentication";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const useContext = Authentication();
  return (
    <AuthContext.Provider value={useContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
