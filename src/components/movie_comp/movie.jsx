import "./movie.css";
import React, { Component } from "react";
import _ from "lodash";
import { getGenres } from "../../services/genreService";
import { getMovies, deleteMovie } from "../../services/movieService";
import MoviesTable from "../moviesTable_comp/moviesTable";
import Pagination from "../common/pagination_comp/pagination";
import Paginate from "../../utils/paginate";
import ListGroup from "../common/listGroup_comp/listGroup";
import { Link } from "react-router-dom";
import SearchBox from "../common/searchBox";
import { toast } from "react-toastify";

class Movie extends Component {
  state = {
    allMovies: [],
    pageSize: 6,
    cPage: 1,
    genres: [],
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: allMovies } = await getMovies();

    this.setState({ allMovies, genres });
  }

  getPgaedData() {
    const {
      allMovies,
      pageSize,
      cPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let fMovies = allMovies;

    if (searchQuery)
      fMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id) {
      fMovies = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );
    }

    const sMovies = _.orderBy(fMovies, [sortColumn.path], [sortColumn.order]);

    const pMovies = Paginate(sMovies, pageSize, cPage);
    return { pMovies, tCount: fMovies.length };
  }

  render() {
    const { pageSize, cPage, genres, sortColumn, searchQuery } = this.state;

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
          <div className="mx-3 mt-3 title d-flex justify-content-between aW">
            <div className="d-flex justify-content-between ">
              <button
                type="button"
                className="navBtn me-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <span className="mx-4 my-2 d-block">Filters</span>
              </button>
              {this.props.user && (
                <Link to="/movieForm/new" className="btn navBtn addNew">
                  <span className="d-inline-block">Add New</span>
                </Link>
              )}
            </div>
            <SearchBox value={searchQuery} onClick={this.handleSearch} />
          </div>
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

  handleDelete = async (i) => {
    const originalMovies = [...this.state.allMovies];
    const newMovies = originalMovies.filter((m) => m._id !== i._id);
    this.setState({ allMovies: newMovies });

    try {
      await deleteMovie(i._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 500)
        toast.error("This Movie doesnt exist");
      this.setState({ allMovies: originalMovies });
    }
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
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleGenreSelect = (g) => {
    this.setState({ selectedGenre: g, searchQuery: "", cPage: 1 });
  };
  handleSearch = (e) => {
    this.setState({ selectedGenre: null, searchQuery: e, cPage: 1 });
  };
}

export default Movie;
