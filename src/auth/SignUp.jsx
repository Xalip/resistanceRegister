import React from "react";
import "./SignUp.css";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const regExEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

const responseGoogle = async responseGoogleLogin => {
  console.log(responseGoogleLogin);
  if (responseGoogleLogin.error) {
    // do nothing, login didnt'work
  } else {
    const userData = responseGoogleLogin.profileObj;
    const responseCreateUser = await axios.post(
      `http://localhost:5000/resistanceregister/us-central1/api/createUser`,
      userData
    );
    console.log(responseCreateUser);
  }
};
//FIXME: hash password!
const emailPasswordSignUp = async oEvent => {
  if (document.getElementById("inputEmail") !== null) {
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const passwordRepeat = document.getElementById("inputPasswordRepeat").value;
    // const email = "";
    // const password = "";
    // const passwordRepeat = "";
    if (password !== passwordRepeat) {
      return;
    }

    const responseCreateUser = await axios.post(
      `http://localhost:5000/resistanceregister/us-central1/api/createUser`,
      {
        givenName: null,
        familyName: null,
        email: email,
        password: password
      }
    );
    console.log(responseCreateUser);
  }
};

function SignUp() {
  return (
    <div className="content">
      <header>
        <div className="title">esistanceRegister</div>
      </header>
      <div className="maingrid">
        <form className="registerForm">
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              //required
              // pattern={regExEmail}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="Password"
            />
            <div className="passwordRepeat">
              <label for="inputPasswordRepeat">Repeat password</label>
              <input
                type="password"
                class="form-control"
                id="inputPasswordRepeat"
                placeholder="Please enter password again"
              />
            </div>
          </div>

          <p>
            {" "}
            Mit Ihrer Anmeldung bestätigen Sie, dass Sie unsere{" "}
            <a
              href="/legal"
              target="_blank"
              data-analytics-event="clickedSignUpTOSLink"
            >
              Nutzungsbedingungen
            </a>{" "}
            und{" "}
            <a
              href="/privacy"
              target="_blank"
              data-analytics-event="clickedSignUpPrivacyLink"
            >
              Datenschutzbestimmungen
            </a>{" "}
            gelesen und akzeptiert haben.{" "}
          </p>

          <div class="row">
            <div class="col text-center">
              <button
                type="submit"
                class="btn signupButton btn-primary"
                onClick={emailPasswordSignUp}
              >
                Sign up
              </button>
            </div>
          </div>
          <div class="login-method-separator">ODER</div>
          <div>
            <GoogleLogin
              clientId="497756564991-ag6l7ra1tfhlk20i7nc0u27qomnld845.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="socialLoginSection"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
