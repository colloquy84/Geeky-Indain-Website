import React from "react";
/*import { Link } from "react-router-dom";*/


const JavaHome = () => (
  <div className="row flex-xl-nowrap geek-main-content">
    <div className="col-12 col-md-3 col-xl-2 bd-sidebar p-1 mt-4">

    </div>
    <div className="col-12 col-md-9 col-xl-8 bd-content mt-4 p-1 ">
    <div className="jumbotron">
      <h1 className="display-4">Java!</h1>
        <p className="lead">Java is a high-level programming language developed by Oracle services.
        It was originally designed for developing programs for set-top boxes and handheld devices,
        but later became a popular choice for creating web applications. The Java syntax is similar to C++,
        but is strictly an object-oriented programming language</p>
        <p className="lead">A new world for java developers is opening soon.</p>
        <hr className="my-4"/>
        <p>Mean while you can go to home page and learn more about us.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="/" role="button">
            <i className="fa fa-home"/>
              &nbsp;&nbsp;Home</a>
          </p>
      </div>
    </div>
    <div className="d-none d-xl-block col-xl-2 col-md-3 bd-toc p-1 mt-4"></div>
  </div>
);

export default JavaHome;
