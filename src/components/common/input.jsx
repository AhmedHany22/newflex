import React from "react";

const Input = ({ type, name, label, error, onChange, value }) => {
  return (
    <React.Fragment>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="signInput w-100"
      />
      {error && <div className="alert alert-danger mt-2 p-2">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
