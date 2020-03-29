import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userContext, UserContextProvider } from './../../userContext'

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.handleInput = this.handleInput.bind(this)
    }

    static contextType = userContext

    render() {
        const { setLoggedIn } = this.context
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
                                className="btn btn-primary float-right" onClick={setLoggedIn}>
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