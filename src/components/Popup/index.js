import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import Button from "@/components/Button";
import styles from "./index.css";

@CSSModules(styles)

class Popup extends React.Component {
  render() {
    return (
      <div styleName="mask" style={this.props.visible ? { display: 'flex' } : { display: 'none' }}>
        <div styleName="pop-container">
          <div styleName="pop-content">
            <div styleName="detail">
              {
                React.Children.map(this.props.children, child => {
                  return child;
                })
              }
            </div>
            <Button active onClick={this.props.onClick} name="了解了"/>
          </div>
        </div>
      </div>
    );
  }
}
Popup.propTypes = {
  // btnText: PropTypes.string,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
  children: PropTypes.array.isRequired
};
Popup.defaultProps = {
  // btnText: '了解了',
  onClick: null,
  visible: true
};

export default Popup;
