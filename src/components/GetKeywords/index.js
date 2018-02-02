import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import QueueAnim from 'rc-queue-anim';
import Button from "@/components/Button";
import styles from "./index.css";

@CSSModules(styles)

class GetKeywords extends React.Component {
  render() {
    return (
      <div styleName="mask" style={this.props.maskShow ? { display: 'flex' } : { display: 'none' }}>
        <QueueAnim
          animConfig={[
            { opacity: [1, 1] },
            { opacity: [1, 0], scale: [1, 0] }
          ]}
          duration={900}
          onEnd={this.props.onEnd}
        >
          { this.props.cardShow ? [
            <div styleName="get-keywords" key="1">
              <div styleName="get-keywords-content">
                <img src={require('@/img/fonts_cjgjc.png')} alt="抽奖关键词"/>
                <button onClick={this.props.onClick}>
                  <img src={require('@/img/get_keywords.png')} alt="领取"/>
                </button>
              </div>
            </div>
            ] : null
          }
        </QueueAnim>
      </div>
    );
  }
}
GetKeywords.propTypes = {
  maskShow: PropTypes.bool,
  cardShow: PropTypes.bool,
  onClick: PropTypes.func,
  onEnd: PropTypes.func
};
GetKeywords.defaultProps = {
  maskShow: true,
  cardShow: true,
  onClick: null,
  onEnd: args => args
};

export default GetKeywords;
