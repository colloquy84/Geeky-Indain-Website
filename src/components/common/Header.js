  import React from "react";
  import { NavLink } from "react-router-dom";
  import "../../css/header.css";

  const Header = () => {
    const activeStyle = { /*color: "#F15B2A" */};
    return (
      <nav id="mainNav" className="navbar fixed-top navbar-icon-top navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand geeky-navbar-brand d-md-inline-block d-xs-none" href="/">
            <img src={require('../../../assets/Logo/Inline-Dark-BG/FullColor_TransparentBg_RECT.png')}
            width="300" height="50" className="d-inline-block align-top " alt=""></img>
        </a>
        <a className="navbar-brand geeky-navbar-brand d-xs-inline-block d-md-none" href="/">
          <img src={require('../../../assets/Logo/Inline/ICON_ONLY_TransparentBg_RECT.png')}
          width="50" height="50" className="d-inline-block align-top" alt=""></img>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/*<li className="nav-item active">
              <NavLink className="nav-link" to="/" activeStyle={activeStyle}>
                    <i className="fa fa-home">
                    </i>
                    Home
              </NavLink>
            </li>*/}
            {/*<li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-envelope-o">
                  <span className="badge badge-primary">11</span>
                </i>
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>*/}
          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <NavLink className="nav-link" to="/javaHome" activeStyle={activeStyle}>
                    <i className="fab fa-java">
                      <span className="badge badge-success">1</span>
                    </i>
                    Java
              </NavLink>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <NavLink className="nav-link" to="/about" activeStyle={activeStyle}>
                      <i className="fa fa-users"></i>
                      About us
              </NavLink>
            </li>
          </ul>
          {/*<form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          */}
        </div>
      </nav>
    );
  };

  export default Header;
