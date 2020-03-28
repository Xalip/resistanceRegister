import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">ResistanceRegister</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="ResistenceRegister">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link class="nav-link" to="/signUp">SignUp</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/signIn">SignIn</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/personalData">PersonalData</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
