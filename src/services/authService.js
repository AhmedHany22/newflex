import http from "./httpService";
import JwtDecode from "jwt-decode";

const tokenName = "token";

export async function signIn(info) {
  const { data: jwt } = await http.post("/auth", info);
  localStorage.setItem(tokenName, jwt);
}
export async function signUp(jwt) {
  localStorage.setItem(tokenName, jwt);
}
export async function signOut() {
  localStorage.removeItem(tokenName);
}
export function currentUser() {
  try {
    const jwt = localStorage.getItem(tokenName);
    return JwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenName);
}

http.setJwt(getJwt());
