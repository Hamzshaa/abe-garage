import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import propTypes from "prop-types";
import getAuth from "../../../util/auth";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loggedInEmployee = getAuth();

    loggedInEmployee.then((response) => {
      if (response.employee_token) {
        setIsLogged(true);
        if (
          roles &&
          roles.length > 0 &&
          roles.includes(response.employee_role)
        ) {
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [roles]);
  if (isChecked) {
    if (!isLogged) {
      // return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      // return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

export default PrivateAuthRoute;

PrivateAuthRoute.propTypes = {
  roles: propTypes.arrayOf(propTypes.number),
  children: propTypes.node.isRequired,
};
