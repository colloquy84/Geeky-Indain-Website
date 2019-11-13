import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";


const SideBarLink = ({ link, onLinkSelected, parentRouteUrl, currentLoadedPage}) => (
  <>
    {link && link.subLinks && link.subLinks.length !=0 ?
      (
          <li key={link.key}
            href={"#"+link.key+"-ul"} onClick={() => onLinkSelected(link.page)}
            data-toggle="collapse" aria-expanded="false" className="dropdown-toggle collapsed">
              <NavLink to={parentRouteUrl+"/"+link.page}> {link.name}</NavLink>
            <ul className="collapse list-unstyled" id={link.key+"-ul"}>
              {link.subLinks.map(subLink => {
                  return <SideBarLink link={subLink} onLinkSelected={onLinkSelected} key={subLink.key}
                            parentRouteUrl={parentRouteUrl +"/"+subLink.page}
                            currentLoadedPage={currentLoadedPage}/>;
                })
              }
            </ul>
        </li>
      ):
      (
        <li>
          <NavLink key={link.key} to={parentRouteUrl+"/"+link.page}
             onClick={() => onLinkSelected(link.page)}>{link.name}</NavLink>
        </li>
      )
    }
  </>
);

SideBarLink.propTypes = {
  link: PropTypes.object.isRequired,
  onLinkSelected: PropTypes.func.isRequired,
  parentRouteUrl: PropTypes.string.isRequired,
  currentLoadedPage: PropTypes.string.isRequired
};

export default SideBarLink;
