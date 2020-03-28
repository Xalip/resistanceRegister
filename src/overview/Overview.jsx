import React from "react";
import "./Overview.css";
import * as L from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var mymap = L.map("oMap").setView([60, -0.09], 4);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
  }

  render() {
    return (
        <div className="oOverview">
          <div className="oCards">
            <div className="oCard" id="oContact">
              <div className="oEdit">
                <FontAwesomeIcon size="lg" icon={faEdit} />
              </div>
              <div>Peter Müller</div>
            </div>
            <div className="oCard" id="oResult">
              <div className="oEdit">
                <FontAwesomeIcon size="lg" icon={faEdit} />
              </div>
              <div>Test Bosch Covid-19</div>
            </div>
          </div>
          <div className="oMap" id="oMap"></div>
        </div>
    );
  }
}

export default Overview;
