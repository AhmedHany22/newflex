import React, { Component } from "react";

class TableHeader extends Component {
  renderSortIcon = (column) => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc mx-2" />;
    if (this.props.sortColumn.order === "desc")
      return <i className="fa fa-sort-desc mx-2" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(
            (col) =>
              col.label &&
              (col.label === "ACTIONS" ? (
                <th key={col.label} colSpan="2">
                  {col.label}
                </th>
              ) : (
                <th
                  key={col.label}
                  onClick={() => this.raiseSort(col.path)}
                  colSpan="1"
                >
                  <span>{col.label}</span>
                  {this.renderSortIcon(col)}
                </th>
              ))
          )}
        </tr>
      </thead>
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

export default TableHeader;
