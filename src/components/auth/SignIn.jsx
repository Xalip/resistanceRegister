import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from './../../userContext'

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            test: "",
            user: {
                loggedIn: false
            }
        }

        this.handleInput = this.handleInput.bind(this)
        this.setLoggedIn = this.setLoggedIn.bind(this)
    }

    setLoggedIn(e) {
        e.preventDefault();
        this.setState({ loggedIn: true })
        localStorage.setItem("loggedIn", true);
    }

    render() {
        const value = {
            user: { loggedIn: true }
        }
        return (
            <userContext.Provider value={value}>
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
                                    className="btn btn-primary float-right" onClick={this.setLoggedIn}>
                                    Sign In
                            </button>
                            </div>
                        </form>
                    </div>
                </div >
            </userContext.Provider>
        )
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    };

}

export default SignIn