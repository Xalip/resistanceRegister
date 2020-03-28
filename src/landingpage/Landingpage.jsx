import React from "react";
import "./Landingpage.css";
import { Link } from "react-router-dom";

function LandingPage() {
    
    
    const title = ""
    const description = ""


    return (
        <div className="content">
            <header>
                <div className="title">esistance Register</div>
            </header>
            <div className="container">
                <div className="card">
                    asdasd
                    asdasdasdasd
                    asdasdasdasd
                    asd

          </div>
            </div>

            <div className="card" /*style="width: 18rem;"*/ >
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>


            <div className="maingrid">
                Here follows information about this project. A branch to the overview page can be found here: <Link to="/overview">Overview</Link>
            </div>
        </div>
    );
}

export default LandingPage;
