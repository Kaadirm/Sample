import React, { useEffect } from "react";
import { useAuth } from "../service/providers/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.user === null) {
      navigate("/login", { replace: true });
    } 
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
