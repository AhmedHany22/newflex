import React, { Component } from "react";

class SearchBox extends React.Component {
  state = { value: this.props.value };
  handleChange = ({ currentTarget: input }) => {
    this.setState({ value: input.value });
  };
  render() {
    const { onClick } = this.props;
    return (
      <div className="col-md-4 d-inline-block aW">
        <div className="input-group mb-3 searchBar">
          {" "}
          <input
            type="text"
            value={this.state.value}
            placeholder="Search ...."
            onChange={this.handleChange}
            className="form-control input-text searchItem"
          />
          <div className="input-group-append">
            <button
              className="btn searchItem"
              onClick={() => onClick(this.state.value)}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;
