import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Landingpage.css";

function LandingPage() {
  const history = useHistory();
  return (
    <div className="lContent">
      <header>
        <div className="title">esistanceRegister</div>
      </header>
      <div className="maingrid">
        Via ResistanceRegister you can help in the fight against Covid-19 by
        sharing your resistance status. Therefore just register on our portal
        and furthermore keep up track on your cities total status.
        <div className="startNow">
          <Button
            onClick={() => {
              history.push("/signUp");
            }}
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
