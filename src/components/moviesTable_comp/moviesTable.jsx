import "./moviesTable.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "../common/like";
import Table from "../common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "TITLE",
      content: (m) => <Link to={`/movieForm/${m._id}`}>{m.title}</Link>,
    },
    { path: "genre.name", label: "GENRA" },
    { path: "numberInStock", label: "STOCK" },
    {
      path: "dailyRentalRate",
      label: "RATING",
      content: (m) => (
        <span>
          <i className="fa fa-star text-warning mx-1" />
          <span className="mx-1">{m.dailyRentalRate}</span>
        </span>
      ),
    },
    {
      key: 1,
      label: "ACTIONS",
      content: (m) => (
        <Like
          status={m.like}
          onLiked={() => {
            this.props.onLiked(m);
          }}
        />
      ),
    },
    {
      key: 2,
      content: (m) => (
        <button className="butn del" onClick={() => this.props.onDelete(m)}>
          <i className="fa fa-trash text-danger"></i>
        </button>
      ),
    },
  ];
  render() {
    const { moviesList, sortColumn, onSort } = this.props;
    return (
      <Table
        data={moviesList}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
