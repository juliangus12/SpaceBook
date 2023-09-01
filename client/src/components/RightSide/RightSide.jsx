import React from "react";
import "./RightSide.css";

import TrendCard from "../TrendCard/TrendCard";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RightSide = () => {
  const navigate = useNavigate(); // Create an instance of useNavigate

  // Function to handle redirection to the homepage
  const redirectToHome = () => {
    navigate("/"); // Redirect to the root (homepage)
  };

  return (
    <div className="RightSide">
      {/* Return to Home button */}
      <button className="button r-button" onClick={redirectToHome}>
        Return to Home
      </button>

      {/* TrendCard */}
      <TrendCard />
    </div>
  );
};

export default RightSide;
