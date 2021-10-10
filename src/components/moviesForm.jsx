import React from "react";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Joi from "joi-browser";
import Form from "./common/form";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre Id"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  async populateGenres() {
    const { data } = await getGenres();
    const genres = [...data];
    this.setState({ genres });
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/");
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div className="bg">
        <div className="myContainer d-flex justify-content-center">
          <form className="form w-75" onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title", "text")}
            <select
              name="genreId"
              value={data.genreId}
              className="form-select inGr"
              onChange={this.handleChange}
            >
              <option key="1" valuse="" hidden>
                Genres
              </option>
              {this.state.genres.map((m) => (
                <option value={m._id} key={m._id} className="text-white">
                  {m.name}
                </option>
              ))}
              {errors.genreId && (
                <div className="alert alert-danger mt-2 p-2">
                  {errors.genreId}
                </div>
              )}
            </select>
            {this.renderInput("numberInStock", "Number In Stock", "number")}
            {this.renderInput("dailyRentalRate", "Daily Rental Rate", "number")}
            {this.submitBtn("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MovieForm;
