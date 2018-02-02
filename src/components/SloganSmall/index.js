import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import sloganImg from "@/img/slogan_small.png";
import styles from "./index.css";

@CSSModules(styles)

class Slogan extends React.Component {
  render() {
    return (
      <div styleName="slogan">
        <img src={sloganImg} alt="slogan"/>
      </div>
    );
  }
}

Slogan.propTypes = {
};

export default Slogan;
