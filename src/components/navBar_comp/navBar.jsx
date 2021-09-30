import "./navBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg nav">
      <div className="container-fluid px-3 pt-3">
        <span className="nav-cont">
          <button
            className="navbar-toggler buttn me-2 px-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars text-white"></i>
          </button>
          <NavLink className="navbar-brand logo" to="/">
            <img src="/images/logo.png" alt="image" />
          </NavLink>
        </span>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/">
                Movies
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
            </li>
          </ul>
        </div>

        <span>
          <NavLink to="/signIn">
            <button className="buttn sBtn" to="/logIn">
              <span className="d-inline-block me-2">Sign In</span>
              <i className="fa fa-sign-in"></i>
            </button>
          </NavLink>
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
