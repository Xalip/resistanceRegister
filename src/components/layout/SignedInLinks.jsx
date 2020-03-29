import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

// create stateless component
function SignedInLinks(props) {
  return (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/test/upload">
          Upload
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/personalData">
          PersonalData
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/overview">
          Overview
        </NavLink>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/#" onClick={props.signOut}>
          Log Out
        </a>
      </li>
    </Fragment>
  );
}

export default SignedInLinks;
