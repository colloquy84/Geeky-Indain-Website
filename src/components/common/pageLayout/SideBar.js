import React from "react";
import PropTypes from "prop-types";

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
      <div > {this.props.sideNav && this.props.sideNav.links && this.props.sideNav.links.map(nav => {
          return (
                <a className="btn btn-light" key={nav.page}
                  href="#" onClick={() => this.props.onPageChange(nav.page)}>{nav.name}</a>
          );
        })
      }
    </div>
    );
  }
}

SideBar.propTypes = {
  firstPageLoaded: PropTypes.bool.isRequired,
  sideNav: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default SideBar;
