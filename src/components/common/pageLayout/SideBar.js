import React from "react";
import PropTypes from "prop-types";
import SideBarLink from "./SideBarLink";


class SideBar extends React.Component {
  state = {};

  componentDidMount() {
    const {
      sideNav,
      firstPageLoaded
    } = this.props;

    if (!firstPageLoaded && sideNav !=null && sideNav.links && sideNav.links.length != 0) {
      this.props.onPageChange(sideNav.links[0].page).catch(error => {
        alert("Loading "+sideNav.links[0].page+" page failed" + error);
      });
    }
  }

  render() {
    return (
      <nav id="sidebar" className={this.props.sideBarVisible?'active':''}>
          <div className="sidebar-header">
              <a className="navbar-brand geeky-navbar-brand" href="/">
                <img src={require('../../../../assets/Logo/Inline/ICON_ONLY_TransparentBg_RECT.png')}
                width="100" height="50" className="d-inline-block align-top rotate" alt=""></img>
              </a>
          </div>
      <ul className="list-unstyled components">
        <p>About</p>
      {this.props.sideNav && this.props.sideNav.links &&
        this.props.sideNav.links.map(link => {
          return (
                <SideBarLink link={link} key={link.key}
                      onLinkSelected={() => this.props.onPageChange(link.page)}/>
          );
        })
      }
      </ul>
    </nav>
    );
  }
}

SideBar.propTypes = {
  firstPageLoaded: PropTypes.bool.isRequired,
  sideBarVisible:PropTypes.bool.isRequired,
  sideNav: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default SideBar;
