  import React from "react";
  import { NavLink } from "react-router-dom";

  const Footer = () => {
    return (
      <div className="geeky-footer">
        <footer className="footer text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <h4 className="text-uppercase mb-4">Location</h4>
                <p className="lead mb-0">Mumbai
                  <br/>Maharashtra, India</p>
              </div>

              <div className="col-lg-4 mb-5 mb-lg-0">
                <h4 className="text-uppercase mb-4">Around the Web</h4>
                <a className="btn btn-outline-light btn-social mx-1" href="#">
                  <i className="fab fa-fw fa-facebook-f"></i>
                </a>
                <a className="btn btn-outline-light btn-social mx-1" href="#">
                  <i className="fab fa-fw fa-twitter"></i>
                </a>
                <a className="btn btn-outline-light btn-social mx-1" href="#">
                  <i className="fab fa-fw fa-linkedin-in"></i>
                </a>
                <a className="btn btn-outline-light btn-social mx-1" href="#">
                  <i className="fab fa-fw fa-dribbble"></i>
                </a>
              </div>

              <div className="col-lg-4">
                <h4 className="text-uppercase mb-4">About</h4>
                <p className="lead mb-0">Geeky Indian is a one stop website for all geeks who wants to learn and succeed
                  <NavLink className="nav-item nav-link my-2 my-sm-0" to="/about">About Geeky Indian</NavLink>
                </p>
              </div>

            </div>
          </div>
        </footer>

        <section className="copyright py-4 text-center text-white">
          <div className="container">
            <small>Copyright &copy; thegeekyindian.com 2020</small>
          </div>
        </section>
      </div>
    
    );
  };

  export default Footer;
