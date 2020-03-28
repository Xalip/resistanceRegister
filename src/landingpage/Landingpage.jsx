import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Landingpage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  let history = useHistory();
  return (
    <div className="content">
      <header>
        <div className="title">esistanceRegister</div>
      </header>
      <div className="maingrid">
        Via ResistanceRegister you can help in the fight against Covid-19 by
        sharing your resistance status. Therefore just register on our portal
        and furthermore keep up track on your cities total status.
        <Button
          className="startNow"
          onClick={() => {
            history.push("/signUp");
          }}
        >
          Start Now
        </Button>
        <Link to="/overview">Overview</Link>
      </div>
    </div>
  );
}

export default LandingPage;
