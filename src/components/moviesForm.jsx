import React, { Component } from "react";
import { Link } from "react-router-dom";

class MovieForm extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="m-5 text-white">Id : {this.props.match.params.id}</h1>
        <button className="btn btn-lg btn-success ms-5">
          <Link to="/">Save</Link>
        </button>
      </React.Fragment>
    );
  }
}

export default MovieForm;
