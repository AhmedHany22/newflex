import "./movie.css";
import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import MoviesTable from "../moviesTable/moviesTable";
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
      <body className="wrapper row m-0">
        <div className="col-2 sidebar">
          <ListGroup
            genres={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>

        <div className="col p-0">
          <main className="wrapper px-3 pt-3">
            <MoviesTable
              moviesList={pMovies}
              onDelete={this.handleDelete}
              onLiked={this.handleLiked}
            />
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