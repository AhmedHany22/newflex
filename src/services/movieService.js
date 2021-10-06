import http from "./httpService";
import { apiMovies } from "../config.json";

export function getMovies() {
  return http.get(apiMovies);
}

export function getMovie(id) {
  return http.get(apiMovies + "/" + id);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiMovies + "/" + movie._id, body);
  }
  return http.post(apiMovies, movie);
}

export function deleteMovie(id) {
  return http.delete(apiMovies + "/" + id);
}
