import "./signIn.css";
import { Link } from "react-router-dom";
import React from "react";
import Form from "../form";
import Joi from "joi-browser";
import { currentUser, signIn } from "../../../services/authService";
import { toast } from "react-toastify";
import { Redirect } from "react-router";

class SignIn extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password").min(5),
  };

  doSubmit = async () => {
    try {
      await signIn(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Invalid Email or Password");
        const errors = { ...this.state.errors };
        errors.email = "invalid email or password";
        this.setState({ errors });
      }
    }
  };

  render() {
    if (currentUser()) return <Redirect to="/" />;

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
              <img src="./images/logo.png" alt="Logo" />
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
