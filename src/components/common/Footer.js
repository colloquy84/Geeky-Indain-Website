  import React from "react";
  import { NavLink } from "react-router-dom";
  import SocialLinks from "./SocialLinks";


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
                <SocialLinks horizontal={true}/>
              </div>

              <div className="col-lg-4 mt-md-0 mt-sm-5 mt-xs-5">
                <h4 className="text-uppercase mb-4">About</h4>
                <p className="lead mb-0">A website for all geeks who wants to learn and succeed
                  <NavLink className="nav-item nav-link my-2 my-sm-0 white-underline-text" to="/about">About Geeky Indian</NavLink>
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
