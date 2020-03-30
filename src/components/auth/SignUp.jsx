import React, { Fragment } from "react";
import "./SignUp.css";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { userContext } from "./../../userContext";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

// const regExEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        loggedIn: false,
        isLoading: false
      },
      email: "",
      password: "",
      passwordRepeat: ""
    };

    this.baseUrl = `${
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_BASE_API_DEPLOY_URL
        : process.env.REACT_APP_BASE_API_LOCAL_URL
    }/user/`;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  async responseGoogleLogin(responseGoogleLogin) {
    if (responseGoogleLogin.error) {
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

  //TODO: feedback in case user is already registered
  async emailPasswordSignUp(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { email, password, passwordRepeat } = this.state;

    if (password !== passwordRepeat) {
      toaster.notify("Please enter the same password in both fields", {
        duration: 3000,
        position: "top-right"
      });
    }

    if (password === passwordRepeat) {
      try {
        const responseCreateUser = await axios.post(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_BASE_API_DEPLOY_URL
              : process.env.REACT_APP_BASE_API_LOCAL_URL
          }/user/email`,
          {
            givenName: null,
            familyName: null,
            email: email,
            password: password
          }
        );
        console.log(responseCreateUser);
        this.context.signIn(responseCreateUser.data);
        this.props.history.push("/personaldata");
      } catch (err) {
        if (err.response.status === 400) {
          console.error(err);
          this.setState({ isLoading: false });
          toaster.notify("This email is already registered, Please log in.", {
            duration: 3000,
            position: "top-right"
          });
        } else {
          toaster.notify("Something went wrong, Please try again later!", {
            duration: 3000,
            position: "top-right"
          });
        }
      }
    }
  }

  static contextType = userContext;

  render() {
    return (
      <div className="contentRegister">
        <header>
          <div className="title">esistanceRegister</div>
        </header>
        <div className="maingridRegister">
          <form className="registerForm">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <div className="passwordRepeat">
                <label>Repeat password</label>
                <input
                  type="password"
                  name="passwordRepeat"
                  className="form-control"
                  id="inputPasswordRepeat"
                  placeholder="Please enter password again"
                  value={this.state.passwordRepeat}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <p>
              {" "}
              With your registration you confirm that you have read and accepted
              our{" "}
              <a
                href="/legal"
                target="_blank"
                data-analytics-event="clickedSignUpTOSLink"
              >
                terms of use
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                target="_blank"
                data-analytics-event="clickedSignUpPrivacyLink"
              >
                privacy policy
              </a>{" "}
              .{" "}
            </p>
            <div className="row">
              <div className="col text-center">
                <button
                  disabled={!this.isFormValid()}
                  type="submit"
                  className="btn signupButton btn-primary"
                  onClick={this.emailPasswordSignUp.bind(this)}
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
                    "Register"
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
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isFormValid() {
    return (
      this.state.email &&
      this.state.password &&
      this.state.password === this.state.passwordRepeat
    );
  }
}

export default SignUp;
