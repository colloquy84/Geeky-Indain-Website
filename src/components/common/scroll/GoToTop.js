import React from "react";
import PropTypes from "prop-types";
import "./goToTop.css";

class GoToTop extends React.Component {
    state = {
         intervalId: 0,
         thePosition: false
     };

    componentDidMount() {
       document.addEventListener("scroll", () => {
           if (window.scrollY > 170) {
                this.setState({ thePosition: true })
           } else {
               this.setState({ thePosition: false })
           }
        });
        window.scrollTo(0, 0);
     }

    onScrollStep = () => {
        if (window.pageYOffset === 0){
            clearInterval(this.state.intervalId);
        }
       window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop = () => {
       let intervalId = setInterval(this.onScrollStep, this.props.delayInMs);
       this.setState({ intervalId: intervalId });
    }

   render() {
      return (
        <>
          {this.state.thePosition &&
              <span className="goToTop" title="Go to top" onClick={() => this.scrollToTop()}>
                <i title="Go to top" className="fas fa-arrow-up"/>
              </span>
          }
        </>
      );
   }
}

GoToTop.propTypes = {
  scrollStepInPx: PropTypes.number,
  delayInMs:PropTypes.number
}

export default GoToTop;
