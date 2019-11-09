import React from "react";
/*import { Link } from "react-router-dom";*/


const JavaHome = () => (
  <div className="row flex-xl-nowrap geek-main-content">
    <div className="col-12 col-md-3 col-xl-2 bd-sidebar"></div>
    <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
    <div className="jumbotron">
      <h1 className="display-4">Java World!</h1>
        <p className="lead">A new world for java developers is pening soon.</p>
        <hr className="my-4"/>
        <p>Mean while you can go to home page and learn more about us.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="/" role="button">
            <i className="fa fa-home"/>
              &nbsp;&nbsp;Home</a>
          </p>
      </div>
    </div>
    <div className="d-none d-xl-block col-xl-2 bd-toc"></div>
  </div>
);

export default JavaHome;
