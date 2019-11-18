import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Helmet} from "react-helmet";
import * as pageDetailAction from "../../../redux/actions/pageDetailAction";
import { WEBSITE_URL } from "../../../util/appConstants";
import { bindActionCreators} from "redux";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import "./mainContent.css";

class MainContent extends React.Component {
  state = {currentLoadedPage:'', urlOfPage:WEBSITE_URL};

  componentDidMount() {
    this.getPageContent(this.props.currentLoadedPage.page).catch(error => {
      toast.error("Loading "+this.props.currentLoadedPage.page+" page failed" + error.message,{
        autoClose:false
      });
    });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentLoadedPage.page != this.props.currentLoadedPage.page){
      this.getPageContent(newProps.currentLoadedPage.page).catch(error => {
        toast.error("Loading "+newProps.currentLoadedPage.page+" page failed" + error.message,{
          autoClose: false
        });
      });
    }
    this.setState({urlOfPage: this.getURLOfThisPage(newProps.parentPages)});
  }

  getURLOfThisPage(pages){
    let pageURL=WEBSITE_URL;
    if( pages && pages.length >0){
      for(let index =0; index < pages.length; index++){
        if(index == 0){
          pageURL = pageURL +pages[index].page;
        }else{
          pageURL = pageURL + "/" +pages[index].page;
        }
      }
    }
    return pageURL;
  }

  getPageContent = async page => {
    if(page && page != this.state.currentLoadedPage){
      try {
        // console.log("Loaded content for "+page);
        this.setCurrentState({currentLoadedPage: page});
        await this.props.actions.getPageContent(this.props.parentPage, page);
        // toast.success(page + "Page Loaded");
      } catch (error) {
        toast.error(page + "could not be loaded for " + this.props.parentPage +
          " section" + error.message, {
            autoClose: false
          });
      }
    }else{
      console.log("Content for "+this.props.parentPage+" type "+page+" page is already loaded");
    }
  };

  setCurrentState(newState){
    this.setState(newState);
  }

  render(){
    return (
      <>
        {this.props.loading ? (
          <Spinner / >
        ) : (
          <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{this.props.pageContent.title}</title>
                <link rel="canonical" href={this.state.urlOfPage} />
                <meta name="description" content={this.props.pageContent.description} />
            </Helmet>
            <h3>{this.props.pageContent.heading}</h3>
            {this.props.pageContent.dataList && this.props.pageContent.dataList.map((content, index) => {
              return (
                <p key={index}>{content.data}</p>
              );
            })}
          </>
        )}
      </>
    );
  }
}

MainContent.propTypes = {
  parentPage: PropTypes.string.isRequired,
  currentLoadedPage: PropTypes.object,
  parentPages: PropTypes.array,
  pageContent: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pageContent: state.currentPage.pageContent,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getPageContent: bindActionCreators(pageDetailAction.getPageContent, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);
