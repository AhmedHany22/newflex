import "./movie.css";
import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import Like from "../common/like";
import Pagination from "../common/pagination_comp/pagination";
import Paginate from "../../utils/paginate";

class Movie extends Component {
  state = { allMovies: [], pageSize: 4, cPage: 1 };

  componentDidMount() {
    this.setState({ allMovies: getMovies() });
  }

  render() {
    const { allMovies, pageSize, cPage } = this.state;

    const pMovies = Paginate(allMovies, pageSize, cPage);

    if (allMovies.length === 0)
      return <h1 className="mt-5">There no more movies in DataBase</h1>;

    return (
      <body className="wrapper">
        <main className="wrapper px-3 pt-3">
          <table className="table main__table mb-3">
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
              {pMovies.map((movie) => (
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
                    <Like
                      status={movie.like}
                      onLiked={() => {
                        this.handleLiked(movie);
                      }}
                    />
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
          <Pagination
            tNum={allMovies.length}
            pSize={pageSize}
            cPage={cPage}
            onPageChange={this.handlePageChange}
          />
        </main>
      </body>
    );
  }
  handleDelete = (i) => {
    const newMovies = this.state.allMovies.filter((m) => m._id !== i._id);
    this.setState({ allMovies: newMovies });
  };
  handleLiked = (i) => {
    const movies = [...this.state.allMovies];
    const index = movies.indexOf(i);
    movies[index].like = !movies[index].like;
    this.setState({ allMovies: movies });
  };
  handlePageChange = (p) => {
    this.setState({ cPage: p });
  };
}

export default Movie;
