import React, { useEffect, useState } from "react";
import Login from "../../components/login/index.jsx";
import { useLocation } from "react-router-dom";
import Signup from "../../components/signUp/index.jsx";

const LoginAndSignup = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname === "/login") {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
  }, [location]);

  return isLoginPage ? <Login /> : <Signup />;
};

export default LoginAndSignup;
