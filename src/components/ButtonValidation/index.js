import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import styles from "./index.css";

@CSSModules(styles, { allowMultiple: true })

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStyle: {
        backgroundImage: 'url(' + require("@/img/bg_button_validation.png") + ')'
      },
      disabledStyle: {
        backgroundImage: 'url(' + require("@/img/bg_button_countdown.png") + ')'
      }
    };
  }
  render() {
    return (
      <div
        styleName="button-validation"
        style={this.props.active ? this.state.activeStyle : this.state.disabledStyle}
        onClick={this.props.onClick}
      >
        {
          React.Children.map(this.props.children, child => {
            return child;
          })
        }
      </div>
    );
  }
}

Button.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.array.isRequired,
};

Button.defaultProps = {
  active: false,
  onClick: null
};

export default Button;
