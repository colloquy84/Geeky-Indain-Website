import React from "react";
import {
  connect
} from "react-redux";
import * as pageDetailAction from "../../../redux/actions/pageDetailAction";
import PropTypes from "prop-types";
import {
  bindActionCreators
} from "redux";
import { toast } from "react-toastify";
import './sideBar.css';

import SideBar from "./SideBar";
import MainContent from "./MainContent";
import Spinner from "../Spinner";

class SideBarWrapper extends React.Component {
  state = {firstPageLoaded: false, sideBarVisible : false, currentLoadedPage : ''};

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

  getPageContent = async page => {
    if(page != this.state.currentLoadedPage){
      try {
        console.log("Loaded content for "+page);
        this.setCurrentState({firstPageLoaded: true, currentLoadedPage: page});
        await this.props.actions.getPageContent(this.props.pageType, page);
        toast.success(page + "Page Loaded");
      } catch (error) {
        toast.error(page + "could not be loaded for " + this.props.pageType +
          " section" + error.message, {
            autoClose: false
          });
      }
    }else{
      console.log("Content for "+page+" page is already loaded");
    }
  };

  sideBarToggled = () => {
    this.setCurrentState({sideBarVisible: !this.state.sideBarVisible});
  }

  setCurrentState(newState){
    this.setState(newState);
  }

  render() {
    return (
      <div className="geek-main-content"> {
        this.props.loading ? ( <
          Spinner / >
        ) : (
          <div className="wrapper">
            { this.props.sideNav && <SideBar sideNav = { this.props.sideNav}
              sideBarVisible={this.state.sideBarVisible}
              onPageChange = {this.getPageContent} firstPageLoaded={this.state.firstPageLoaded}/>
            }
            {this.props.pageContent && <MainContent pageContent = { this.props.pageContent}
                colapseLinkClicked = {this.sideBarToggled}/>}
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
  pageContent: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    sideNav: state.currentPage.sideNav,
    pageContent: state.currentPage.pageContent,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getSideNav: bindActionCreators(pageDetailAction.getSideNav, dispatch),
      getPageContent: bindActionCreators(pageDetailAction.getPageContent, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarWrapper);
