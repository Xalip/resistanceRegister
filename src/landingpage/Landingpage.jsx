import React from "react";
import "./Landingpage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="content">
      <header>
        <div className="title">esistance Register</div>
      </header>
      <div className="maingrid">
        Here follows information about this project. A branch to the overview page can be found here: <Link to="/overview">Overview</Link>
      </div>
    </div>
  );
}

export default LandingPage;
