import React, { Component, Fragment } from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { userContext } from "./../../userContext";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.registetButton = this.logUserInEmail.bind(this);
    this.registetButton = this.registetButton.bind(this);
  }

  registetButton(e) {
    e.preventDefault();
    console.error("test");
    this.props.history.push("/signUp");
  }

  async logUserInEmail(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    try {
      const responseLogUserIn = await axios.post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BASE_API_DEPLOY_URL
            : process.env.REACT_APP_BASE_API_LOCAL_URL
        }/user/signin`,
        {
          email: this.state.email,
          password: this.state.password
        }
      );
      this.context.signIn(responseLogUserIn.data);
      this.props.history.push("/personaldata");
    } catch (error) {
      this.setState({ isLoading: false });
      // TODO: user feedback in case login is not working
      console.error(new Error(error));
    }
  }

  async responseGoogleLogin(responseGoogleLogin) {
    if (responseGoogleLogin.error) {
      // TODO: user response about error
      // do nothing, login didnt'work
    } else {
      const userData = responseGoogleLogin.profileObj;
      const responseCreateUser = await axios.post(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BASE_API_DEPLOY_URL
            : process.env.REACT_APP_BASE_API_LOCAL_URL
        }/user/google`,
        userData
      );
      this.context.signIn(responseCreateUser.data);
      this.props.history.push("/personaldata");
    }
  }

  static contextType = userContext;

  render() {
    return (
      <div className="contentLogin">
        <header>
          <div className="title">esistanceRegister</div>
        </header>
        <div className="maingridLogin">
          <form className="loginForm">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInput}
              />
            </div>
            <div className="row">
              <div className="col text-center">
                <button
                  type="submit"
                  className="btn btn-primary loginButton"
                  onClick={this.logUserInEmail}
                >
                  {this.state.isLoading ? (
                    <Fragment>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...{" "}
                    </Fragment>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </div>
            <div className="login-method-separator">OR</div>
            <div>
              <GoogleLogin
                clientId="497756564991-i12ocg176ekvvvm4dbhigj1otst8com6.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={this.responseGoogleLogin.bind(this)}
                onFailure={this.responseGoogleLogin.bind(this)}
                cookiePolicy={"single_host_origin"}
                className="socialLoginSection"
              />
              <Link to="/signUp">Register</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
}

export default SignIn;
