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
        Hier folgen Informationen zu diesem Projekt. Eine Verzweigung auf die
        Übersichtsseite findet Ihr hier: <Link to="/overview">Overview</Link>
      </div>
    </div>
  );
}

export default LandingPage;
