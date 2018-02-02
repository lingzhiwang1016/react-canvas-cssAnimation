import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import styles from "./index.css";

@CSSModules(styles, { allowMultiple: true })

class Card extends React.Component {
  render() {
    return (
      <div styleName={"card " + this.props.styleName}>
        <img src={this.props.img} alt={this.props.keyword}/>
      </div>
    );
  }
}

Card.propTypes = {
  styleName: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};
Card.defaultProps = {
};

export default Card;
