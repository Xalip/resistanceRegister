import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/#">ResistanceRegister</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="ResistenceRegister">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/signUp">SignUp</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signIn">SignIn</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/test/upload">Upload</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
