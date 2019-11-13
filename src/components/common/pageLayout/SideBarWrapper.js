import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import * as pageDetailAction from "../../../redux/actions/pageDetailAction";
import PropTypes from "prop-types";
import { bindActionCreators} from "redux";
import './sideBar.css';

import SideBar from "./SideBar";
import MainContent from "./MainContent";
import Spinner from "../Spinner";

class SideBarWrapper extends React.Component {
  state = {firstPageLoaded: false, sideBarVisible : false, currentLoadedPage : ''};

  componentWillReceiveProps(newProps){
    const path = location.pathname;
    if(path && path.indexOf("/") >= 0 && path.indexOf("/") != path.lastIndexOf("/")){
      const currentLoadedPage = path.substring(path.lastIndexOf("/")+1);
      console.log("currentLoadedPage  --> ", currentLoadedPage);
      if(currentLoadedPage){
        this.setState({currentLoadedPage: currentLoadedPage});
      }
    }
    console.log("SideBarWrapper  --> ", path);
  }

  componentDidMount() {
    const {
      pageType, actions
    } = this.props;

    if (pageType.length != 0) {
      actions.getSideNav(pageType).catch(error => {
        alert("Loading page "+pageType+"failed" + error);
      });
    }
  }

  setCurrentState(newState){
    this.setState(newState);
  }

  sideBarToggled = () => {
    this.setCurrentState({sideBarVisible: !this.state.sideBarVisible});
  };

  getPageContent = (page)=> {
    this.setCurrentState({currentLoadedPage: page});
  }

  render() {
    return (
      <div className="geek-main-content"> {
        this.props.loading ? ( <
          Spinner / >
        ) : (
          <div className="sideBarwrapper">
            { this.props.sideNav && <SideBar sideNav = { this.props.sideNav}
              sideBarVisible={this.state.sideBarVisible}
              onPageChange = {this.getPageContent}
              parentRouteUrl={this.props.parentRouteUrl}
              currentLoadedPage = {this.state.currentLoadedPage}/>
            }
            <Route path={this.props.parentRouteUrl+"/:id"}>
              <MainContent colapseLinkClicked = {this.sideBarToggled}
                  parentRouteUrl={this.props.parentRouteUrl}
                  parentPage ={this.props.pageType}
                  currentLoadedPage = {this.state.currentLoadedPage}/>
            </Route>
          </div>
        )
      }
    </div>
    );
  }
}

SideBarWrapper.propTypes = {
  pageType: PropTypes.string.isRequired,
  sideNav: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  parentRouteUrl:PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    sideNav: state.currentPage.sideNav,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getSideNav: bindActionCreators(pageDetailAction.getSideNav, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarWrapper);
