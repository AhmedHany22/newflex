import React, { Component } from "react";

class SearchBox extends React.Component {
  state = { value: this.props.value };
  handleChange = ({ currentTarget: input }) => {
    this.setState({ value: input.value });
  };
  render() {
    const { onClick } = this.props;
    return (
      <div class="col-md-4 d-inline-block aW">
        <div class="input-group mb-3 searchBar">
          {" "}
          <input
            type="text"
            value={this.state.value}
            placeholder="Search ...."
            onChange={this.handleChange}
            class="form-control input-text searchItem"
          />
          <div class="input-group-append">
            <button
              class="btn searchItem"
              onClick={() => onClick(this.state.value)}
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;
