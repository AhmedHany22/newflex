import "./movie.css";
import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import Like from "../common/like";
import Pagination from "../common/pagination_comp/pagination";
import Paginate from "../../utils/paginate";
import ListGroup from "../common/listGroup_comp/listGroup";

class Movie extends Component {
  state = { allMovies: [], pageSize: 4, cPage: 1, genres: [] };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ allMovies: getMovies(), genres });
  }

  render() {
    const { allMovies, pageSize, cPage, genres, selectedGenre } = this.state;

    const fMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;

    const pMovies = Paginate(fMovies, pageSize, cPage);

    if (allMovies.length === 0)
      return <h1 className="mt-5">There no more movies in DataBase</h1>;

    return (
      <body className="wrapper row">
        <div className="col-2 sidebar">
          <ListGroup
            genres={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>

        <div className="col p-0">
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
              tNum={fMovies.length}
              pSize={pageSize}
              cPage={cPage}
              onPageChange={this.handlePageChange}
            />
          </main>
        </div>
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
  handleGenreSelect = (g) => {
    this.setState({ selectedGenre: g, cPage: 1 });
  };
}

export default Movie;
