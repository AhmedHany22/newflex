import React from "react";

const Input = ({ label, error, ...rest }) => {
  return (
    <React.Fragment>
      <input {...rest} placeholder={label} className="signInput w-100" />
      {error && <div className="alert alert-danger mt-2 p-2">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
