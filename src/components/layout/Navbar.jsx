import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import { userContext } from "./../../userContext";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a className="navbar-brand" href="/#">
        ResistanceRegister
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="ResistenceRegister"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <userContext.Consumer>
            {({ user, signOut }) =>
              user.isLoggedIn ? (
                <SignedInLinks signOut={signOut} />
              ) : (
                <SignedOutLinks />
              )
            }
          </userContext.Consumer>
        </ul>
      </div>
    </nav>
  );
}
