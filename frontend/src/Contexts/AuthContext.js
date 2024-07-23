import React, { useState, useEffect, useContext } from "react";
import getAuth from "../util/auth";
import propTypes from "prop-types";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);

  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged, employee };

  useEffect(() => {
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      if (response.employee_token) {
        setIsLogged(true);
        if (response.employee_role === 3) {
          setIsAdmin(true);
        }
        setEmployee(response);
      }
    });
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
