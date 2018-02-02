import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import styles from "./index.css";

@CSSModules(styles)

class Title extends React.Component {
  render() {
    return (
      <div styleName="title">
        <img src={this.props.img} alt={this.props.name}/>
      </div>
    );
  }
}

Title.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Title;
