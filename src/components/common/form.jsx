import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const errors = {};
    const { data } = this.state;
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;
    error.details.map((e) => (errors[e.path[0]] = e.message));
    return errors;
  };

  validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema);
    return !error ? null : error.details[0].message;
  };
  handleSubmit = (e) => {
    e.preventDefault();

    // Handle errors
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // Server Side
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };
  submitBtn = (label) => {
    return (
      <button className="signBtn" type="submit" disabled={this.validate()}>
        {label}
      </button>
    );
  };
  renderInput = (name, label, type) => {
    const { data, errors } = this.state;
    return (
      <div className="w-100 input">
        <Input
          type={type}
          name={name}
          label={label}
          value={data[name]}
          error={errors[name]}
          onChange={this.handleChange}
        />
      </div>
    );
  };
}

export default Form;
