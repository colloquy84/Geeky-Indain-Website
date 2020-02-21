import React from "react";
import SocialLinks from "../common/socialLinks/SocialLinks";

const HomePage = () => (
  <div className="row flex-xl-nowrap topRouterWrapper noBackgroundLogo d-flex m-0">
	  <div className="masthead col-md-7 order-md-1 order-2 order-sm-2">
	    <div className="masthead-bg"></div>
	    <div className="container h-100">
	      <div className="row h-100">
	        <div className="col-12 my-auto">
	          <div className="masthead-content text-white py-5">
	            <h1 className="mb-3">Coming Soon</h1>
	            <p className="mb-5">We are working hard to finish the development of this site. Our target launch date is
	              <strong>&nbsp;May 2021</strong>. Sign up for updates using the form below</p>
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
    <div className="col-md-5 order-md-2 order-sm-1 row">
        <div className="m-auto">
          <img src={require('../../../assets/Logo/Icon/FullColor_TransparentBg_1024x1024_72dpi.png')}
            width="400" height="50" className="d-inline-block align-top rotate" alt=""></img>
        </div>
    </div>
	  <SocialLinks/>
  </div>
);

export default HomePage;
