import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

// create stateless component
function SignedOutLinks(props) {
    return (
        <Fragment>
            <li className="nav-item"><NavLink className="nav-link" to="/signUp">Register</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/signIn">Login</NavLink></li>
        </Fragment>
    );
}

export default SignedOutLinks;
