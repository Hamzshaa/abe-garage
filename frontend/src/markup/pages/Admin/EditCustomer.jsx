import React from 'react';
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/LoginForm/LoginForm';
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
// Import the customer list component

import EditCustomerForm from '../../components/Admin/EditCustomerForm/EditCustomerForm';

function EditCustomer() {
  // Destructure the auth hook 
  const { isLogged, isAdmin, isManager } = useAuth();

  console.log("isLogged:", isLogged);
  console.log("isAdmin:", isAdmin);
 

  if (!isLogged) {
    return <LoginForm />;
  }

  if (!isAdmin && !isManager) {
    return (
      <div className="container text-center mt-5">
        <h1 className="text-danger">You are not authorized to access this page</h1>
      </div>
    );
  }

  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <EditCustomerForm />
        </div>
      </div>
    </div>
  );
}

export default EditCustomer;
