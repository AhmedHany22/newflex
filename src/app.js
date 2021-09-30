import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Movie from "./components/movie_comp/movie";
import NavBar from "./components/navBar_comp/navBar";
import NotFound from "./components/common/notFound_comp/notFound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/moviesForm";

const App = () => {
  return (
    <Switch>
      <Route path="/not-found" component={NotFound} />
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
  );
};

export default App;
