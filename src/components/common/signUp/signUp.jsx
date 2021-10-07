import "./signUp.css";
import { Link } from "react-router-dom";
import React from "react";
import Form from "../form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { registerUser } from "../../../services/userService";
import { signUp } from "../../../services/authService";

class SignUp extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };
  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password").min(5),
  };

  doSubmit = async () => {
    try {
      const response = await registerUser(this.state.data);
      await signUp(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("This user already registered");
        const errors = { ...this.state.errors };
        errors.email = "This Email already registered";
        this.setState({ errors });
      }
      return;
    }
    toast.success("Registered Successfully");
  };
  render() {
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
            {this.renderInput("name", "Name", "text")}
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            <div className="inGr signGroup">
              <input type="checkbox" className="me-3" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            {this.submitBtn("Register")}
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
            <span className="signText mt-4">
              Already have an account? <Link to="/signIn">Sign in!</Link>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
