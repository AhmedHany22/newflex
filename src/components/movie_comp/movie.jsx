import "./movie.css";
import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import MoviesTable from "../moviesTable/moviesTable";
import Pagination from "../common/pagination_comp/pagination";
import Paginate from "../../utils/paginate";
import ListGroup from "../common/listGroup_comp/listGroup";

class Movie extends Component {
  state = {
    allMovies: [],
    pageSize: 6,
    cPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      allMovies: getMovies(),
      genres,
    });
  }

  getPgaedData() {
    const { allMovies, pageSize, cPage, selectedGenre, sortColumn } =
      this.state;
    const fMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sMovies = _.orderBy(fMovies, [sortColumn.path], [sortColumn.order]);

    const pMovies = Paginate(sMovies, pageSize, cPage);
    return { pMovies, tCount: fMovies.length };
  }

  render() {
    const { allMovies, pageSize, cPage, genres, sortColumn } = this.state;

    if (allMovies.length === 0)
      return <h1 className="mt-5">There no more movies in DataBase</h1>;

    const { pMovies, tCount } = this.getPgaedData();

    return (
      <main className="wrapper row m-0">
        <div className="col-0 sidebar">
          <div
            className="offcanvas offcanvas-start canvann"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header text-white mx-1 mt-1">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Filters
              </h5>
              <button
                className="close-btn"
                type="button"
                data-bs-dismiss="offcanvas"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="offcanvas-body py-0">
              <ListGroup
                genres={genres}
                onItemSelect={this.handleGenreSelect}
                selectedItem={this.state.selectedGenre}
              />
            </div>
          </div>
        </div>
        <div className="col p-0">
          <main className="wrapper px-3 pt-3">
            <MoviesTable
              moviesList={pMovies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onLiked={this.handleLiked}
              onDelete={this.handleDelete}
            />
            <Pagination
              tNum={tCount}
              pSize={pageSize}
              cPage={cPage}
              onPageChange={this.handlePageChange}
            />
          </main>
        </div>
      </main>
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
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
}

export default Movie;
