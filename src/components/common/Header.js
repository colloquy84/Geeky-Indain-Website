  import React from "react";
  import { NavLink } from "react-router-dom";

  const Header = () => {
    const activeStyle = { /*color: "#F15B2A" */};
    return (
      <nav className="navbar navbar-expand-md bg-secondary text-uppercase fixed-top" id="mainNav">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" 
            aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          <img src={require('../../../assets/Logo/logo_reduced_width.png')} width="100" height="100"
             className="d-inline-block align-top" alt=""></img>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand geeky-navbar-brand" href="/">
          <img src={require('../../../assets/Logo/logo_reduced_width.png')} width="150" height="100"
             className="d-inline-block align-top" alt=""></img>
          </a>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 rounded">
              <li className="nav-item mx-0 mx-lg-1">
                <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" 
                  to="/javaHome" activeStyle={activeStyle}>Java</NavLink>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <NavLink className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/about">About</NavLink>
              </li>
            </ul>
          </form>
        </div>
      </nav>
    );
  };

  export default Header;
