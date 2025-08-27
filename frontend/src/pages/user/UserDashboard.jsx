import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/user/stores");
  }, [navigate]);

  return null;
};

export default UserDashboard;
