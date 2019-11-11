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
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import Spinner from "../Spinner";

class SideBarWrapper extends React.Component {
  state = {firstPageLoaded: false};

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
    this.state.firstPageLoaded = true;
    toast.success(page + "Page Loaded");
    try {
      await this.props.actions.getPageContent(this.props.pageType, page);
    } catch (error) {
      toast.error(page + "could not be loaded for " + this.props.pageType +
        " section" + error.message, {
          autoClose: false
        });
    }
  };

  render() {
    return (
      <div > {
        this.props.loading ? ( <
          Spinner / >
        ) : (
          <div >
            { this.props.sideNav && <SideBar sideNav = { this.props.sideNav}
              onPageChange = {this.getPageContent} firstPageLoaded={this.state.firstPageLoaded}/>
            }
            {this.props.pageContent && <MainContent pageContent = { this.props.pageContent}/>}
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
