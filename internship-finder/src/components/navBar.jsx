import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({user}) => {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Internshipper
      </Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarText" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/internships">
            Internships
          </NavLink>
          
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              {/* <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink> */}
              <NavLink className="nav-item nav-link" to="/myInterestList">
                My Interest List
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
