  import React from "react";
  import PropTypes from "prop-types";

  const SocialLinks = (prop) => {
    return (
     	<div className={prop.horizontal ? 'social-icons social-icons-horizontal' : 'social-icons d-none d-md-block'}>
	        <ul className="list-unstyled text-center mb-0">
	          <li className="list-unstyled-item">
	            <a href="https://twitter.com/TheGeekyIndian" target="_blank" rel="noopener noreferrer">
	              <i className="fab fa-twitter"></i>
	            </a>
	          </li>
	          <li className="list-unstyled-item">
	            <a href="https://www.facebook.com/TheGeekyIndianPage" target="_blank" rel="noopener noreferrer">
	              <i className="fab fa-facebook-f"></i>
	            </a>
	          </li>
	          <li className="list-unstyled-item">
	            <a href="https://www.linkedin.com/in/thegeekyindian/" target="_blank" rel="noopener noreferrer">
	              <i className="fab fa-linkedin"></i>
	            </a>
	          </li>
	        </ul>
	      </div>
    );
  };

 SocialLinks.propTypes = {
  horizontal: PropTypes.bool
 }

  export default SocialLinks;
