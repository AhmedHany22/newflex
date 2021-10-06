import Axios from "axios";
import { log } from "./logService";
import { toast } from "react-toastify";

Axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status === 500;

  if (!expectedError) {
    toast.error("Something went wrong");
    log(error);
  }
  return Promise.reject(error);
});

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  push: Axios.push,
  delete: Axios.delete,
};
