import React from "react";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = (Component) => {
  return (...props) => {
    const user = useSelector((state=>state.user));
    if (!user?.data?.role) {
      return <Navigate to='/login' replace />;
    }

    if (user?.data?.role !== "ADMIN") {
      return <Navigate to='/' replace />;
    }
    return <Component {...props} />;
  };
};

export default AdminRoute;
