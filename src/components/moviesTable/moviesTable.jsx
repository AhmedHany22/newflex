import "./moviesTable.css";
import Like from "../common/like";
import React, { Component } from "react";

class MoviesTable extends React.Component {
  render() {
    const { moviesList, onDelete, onLiked, sortColumn } = this.props;
    return (
      <table className="table main__table mb-3">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")} colSpan="1">
              <span>TITLE</span>
            </th>
            <th onClick={() => this.raiseSort("genre.name")} colSpan="1">
              <span>GENRA</span>
            </th>
            <th onClick={() => this.raiseSort("numberInStock")} colSpan="1">
              <span>STOCK</span>
            </th>
            <th onClick={() => this.raiseSort("dailyRentalRate")} colSpan="1">
              <span>RATING</span>
            </th>
            <th colSpan="2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {moviesList.map((m) => (
            <tr key={m._id}>
              <td>
                <div className="main__table-text mt-1">
                  <a href="">{m.title}</a>
                </div>
              </td>
              <td>
                <div className="main__table-text mt-1">{m.genre.name}</div>
              </td>
              <td>
                <div className="main__table-text mt-1">{m.numberInStock}</div>
              </td>
              <td>
                <div className="main__table-text mt-1">
                  <i className="fa fa-star text-warning"></i>
                  {m.dailyRentalRate}
                </div>
              </td>
              <td>
                <Like
                  status={m.like}
                  onLiked={() => {
                    onLiked(m);
                  }}
                />
              </td>
              <td>
                <button className="butn del" onClick={() => onDelete(m)}>
                  <i className="fa fa-trash text-danger"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
}

export default MoviesTable;
