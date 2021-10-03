import "./signIn.css";
import { Link } from "react-router-dom";
import Input from "../input";
import React from "react";
import Form from "../form";
import Joi from "joi-browser";

class SignIn extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password").min(5),
  };

  doSubmit = () => {
    // Calling Server
    console.log("Submitted");
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div
        className="bg"
        style={{
          backgroundImage: "url(/images/bg.jpg)",
        }}
      >
        <div className="myContainer d-flex justify-content-center">
          <form className="signForm mx-auto" onSubmit={this.handleSubmit}>
            <Link to="/" className="w-50 mb-5">
              <img src="./images/logo.png" />
            </Link>
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            <div className="w-100 inGr signGroup">
              <input type="checkbox" className="me-3 check" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            {this.submitBtn("Login")}
            <span className="or">or</span>
            <div className="signSocial">
              <button className="fb mx-1">
                <i className="fa mt-1 fa-facebook-f" />
              </button>
              <button className="tw mx-1">
                <i className="fa mt-1 fa-twitter" />
              </button>
              <button className="gl mx-1">
                <i className="fa mt-1 fa-google" />
              </button>
            </div>
            <span className="signText">
              Don't have an account? <Link to="/signup">Sign up!</Link>
            </span>
            <span className="signText">
              <Link to="/forgot">Forgot password?</Link>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
