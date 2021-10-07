import http from "./httpService";
import { apiUsers } from "../config.json";

export function registerUser(user) {
  return http.post(apiUsers, user);
}
