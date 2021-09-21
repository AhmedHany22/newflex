import "./movie.css";
import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movie extends Component {
  state = { allMovies: getMovies() };

  render() {
    const { allMovies } = this.state;

    if (allMovies.length === 0)
      return <h1 className="mt-5">There no more movies in DataBase</h1>;

    return (
      <body className="wrapper">
        <main className="wrapper px-3 pt-3">
          <table className="table main__table m-0">
            <thead>
              <tr>
                <th colSpan="1">TITLE</th>
                <th colSpan="1">GENRA</th>
                <th colSpan="1">STOCK</th>
                <th colSpan="1">RATING</th>
                <th colSpan="2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {allMovies.map((movie) => (
                <tr key={movie._id}>
                  <td>
                    <div className="main__table-text mt-1">
                      <a href="">{movie.title}</a>
                    </div>
                  </td>
                  <td>
                    <div className="main__table-text mt-1">
                      {movie.genre.name}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-text mt-1">
                      {movie.numberInStock}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-text mt-1">
                      <i className="fa fa-star text-warning"></i>{" "}
                      {movie.dailyRentalRate}
                    </div>
                  </td>
                  <td>
                    <button className="butn like">
                      <i className="text-primary fa fa-thumbs-up"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="butn del"
                      onClick={() => this.handleDelete(movie)}
                    >
                      <i className="fa fa-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </body>
    );
  }
  handleDelete = (i) => {
    const newMovies = this.state.allMovies.filter((m) => m._id !== i._id);
    this.setState({ allMovies: newMovies });
  };
}

export default Movie;
