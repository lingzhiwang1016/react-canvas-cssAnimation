import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import styles from "./index.css";

@CSSModules(styles)

class Input extends React.Component {
  render() {
    const { error, onErrorClick } = this.props;
    return (
      <div styleName="input-container">
        <input
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        />
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onErrorClick: PropTypes.func,
  error: PropTypes.array,
};

Input.defaultProps = {
  onBlur: null,
  onChange: null,
  value: '',
  onErrorClick: null,
  error: [],
};

export default Input;
