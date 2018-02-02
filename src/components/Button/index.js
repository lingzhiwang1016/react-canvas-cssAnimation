import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import styles from "./index.css";

@CSSModules(styles, { allowMultiple: true })

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bg: 'bg-active'
    };
  }
  componentWillMount() {
    !this.props.active ? this.setState({ bg: 'bg-disabled' }) : null;
  }
  render() {
    return (
      <div styleName={"button " + this.state.bg} onClick={this.props.onClick}>{this.props.name}</div>
    );
  }
}

Button.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired
};

Button.defaultProps = {
  active: false,
  onClick: null
};

export default Button;
