import "./signIn.css";
import { Link } from "react-router-dom";
import Input from "../input";
import React, { Component } from "react";
import Joi from "joi-browser";

class SignIn extends Component {
  state = {
    account: { email: "", password: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;
    const { error } = Joi.validate(account, this.schema, { abortEarly: false });
    if (!error) return null;
    error.details.map((e) => (errors[e.path[0]] = e.message));
    return errors;
  };

  validateProperty = (input) => {
    if (input.name === "email") {
      if (input.value === "") return "Email must be entered";
    }
    if (input.name === "password") {
      if (input.value === "") return "Password must be entered";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Handle errors
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // Calling Server
    console.log("Submitted");
  };

  render() {
    const { account, errors } = this.state;
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
            <div className="w-100 inGr">
              <Input
                error={errors.email}
                type="email"
                name="email"
                label="Email"
                onChange={this.handleChange}
                value={account.email}
              />
            </div>
            <div className="w-100 inGr">
              <Input
                error={errors.password}
                type="password"
                name="password"
                label="Password"
                onChange={this.handleChange}
                value={account.password}
              />
            </div>
            <div className="w-100 inGr signGroup">
              <input type="checkbox" className="me-3 check" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <button className="signBtn" type="submit">
              Sign in
            </button>
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
