import React from "react";
import "./Landingpage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="content">
      <header>
        <div className="title">esistanceRegister</div>
      </header>
      <div className="maingrid">
        <Link to="/overview">Overview</Link>
      </div>
    </div>
  );
}

export default LandingPage;
