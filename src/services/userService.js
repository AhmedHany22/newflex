import http from "./httpService";

export function registerUser(user) {
  return http.post("/users", user);
}
