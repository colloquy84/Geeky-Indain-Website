import React from "react";
import PropTypes from "prop-types";

const SideBarLink = ({ link, onLinkSelected }) => (
  <>
    {link && link.subLinks && link.subLinks.length !=0 ?
      (
        <li className="active1">
          <a key={link.key}
            href="#" onClick={() => onLinkSelected(link.page)}
            data-toggle="collapse" aria-expanded="false" className="dropdown-toggle collapsed">{link.name}</a>
            <ul className="collapse list-unstyled">
              {link.subLinks.map(subLink => {
                  return <SideBarLink link={subLink} onLinkSelected={onLinkSelected} key={subLink.key}/>;
                })
              }
            </ul>
        </li>
      ):
      (
        <li>
          <a key={link.key}
            href="#" onClick={() => onLinkSelected(link.page)}>{link.name}</a>
        </li>
      )
    }
  </>
);

SideBarLink.propTypes = {
  link: PropTypes.object.isRequired,
  onLinkSelected: PropTypes.func.isRequired
};

export default SideBarLink;
