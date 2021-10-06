import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Movie from "./components/movie_comp/movie";
import NavBar from "./components/navBar_comp/navBar";
import NotFound from "./components/common/notFound_comp/notFound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/moviesForm";
import SignIn from "./components/common/signIn/signIn";
import SignUp from "./components/common/signUp/signUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        <Route path="/not-found" component={NotFound} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route>
          <div>
            <NavBar />
            <Switch>
              <Route path="/movieForm/:id" component={MovieForm} />
              <Route path="/movieForm" component={MovieForm} />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/movies" component={Movie} />
              <Redirect from="/" exact to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;
