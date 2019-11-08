import React from "react";
import SocialLinks from "../common/SocialLinks";

const HomePage = () => (
  <div className="row flex-xl-nowrap geek-main-content">
	  <div className="masthead">
	    <div className="masthead-bg"></div>
	    <div className="container h-100">
	      <div className="row h-100">
	        <div className="col-12 my-auto">
	          <div className="masthead-content text-white py-5 py-md-0">
	            <h1 className="mb-3">Coming Soon</h1>
	            <p className="mb-5">We are working hard to finish the development of this site. Our target launch date is
	              <strong>&nbsp;May 2020</strong>. Sign up for updates using the form below</p>
	            <div className="input-group input-group-newsletter">
	              <input type="email" className="form-control" placeholder="Enter email..." aria-label="Enter email..." 
	              aria-describedby="basic-addon"/>
	              <div className="input-group-append">
	                <button className="btn btn-secondary" type="button">Notify Me!</button>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
	  </div>

	  <SocialLinks/> 
  </div>
);

export default HomePage;
