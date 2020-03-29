import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from './../../userContext'
import axios from "axios"

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.handleInput = this.handleInput.bind(this)
        this.logUserIn = this.logUserIn.bind(this)
    }

    async logUserIn(e) {
        e.preventDefault()

        const { setLoggedIn } = this.context
        try {
            const responseLogUserIn = await axios.post(
                `${process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASE_API_DEPLOY_URL : process.env.REACT_APP_BASE_API_LOCAL_URL}/user/signin`,
                {
                    email: this.state.email,
                    password: this.state.password
                }
            );
            setLoggedIn()
        } catch (error) {
            // TODO: user feedback in case login is not working
            console.error(new Error(error))
        }
    }

    static contextType = userContext

    render() {
        return (
            <div className="container">
                <div className="jumbotron bg-white">
                    <h1 className="display-4">Sign In</h1>
                    <form className="mt-5">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control"
                                id="email" placeholder="Enter email"
                                name="email" value={this.state.email}
                                onChange={this.handleInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control"
                                id="password" placeholder="Password"
                                name="password" value={this.state.password}
                                onChange={this.handleInput} />
                        </div>
                        <div className="mt-5">
                            <Link to="/signUp">Register</Link>
                            <button type="submit"
                                className="btn btn-primary float-right" onClick={this.logUserIn}>
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    };

}

export default SignIn