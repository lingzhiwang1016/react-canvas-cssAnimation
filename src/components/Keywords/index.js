import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import QueueAnim from 'rc-queue-anim';

import Title from "@/components/Title";
// import Card from "@/components/Card";
import styles from "./index.css";


@CSSModules(styles, { allowMultiple: true })

class Keywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finalKeywords: false
    };
  }
  // 已签到显示页面
  renderCheckin() {
    const items = this.props.keywords.map((keyword, index) =>
      <div styleName={"card target-state" + (index + 1)} key={index}>{keyword}</div>);
    return (
      <div>
        {items}
      </div>
    );
  }
  renderFinalKeywords() {
    const data = ['春晚', '春晚', '春晚', '春晚', '春晚', '春晚'];
    const items = data.map((keyword, index) =>
      <div styleName="final-keywords-item" key={index}>{keyword}</div>);
    return (
      <div styleName="final-keywords-content">
        {items}
      </div>
    );
  }
  // 第一次签到成功渲染页面
  renderKeywords() {
    const items = this.props.keywords.map((keyword, index) =>
      <div styleName={"card init-state animate" + (index + 1)} key={index}>{keyword}</div>);
    return (
      <div>
        {this.props.startAni && <div>{ items }</div>}
      </div>
    );
  }
  render() {
    return (
      <div styleName="card-main">
        <div styleName="bg-top"/>
        {this.state.finalKeywords &&
          <div>
            <div styleName="final-keywords">
              <Title img={require('@/img/fonts_xwcwgjc.png')} name="厦万春晚关键词"/>
              {this.renderFinalKeywords()}
            </div>
            <div styleName="bg-dashed"/>
          </div>
        }
        <div styleName="keywords-container">
          <img src={require('@/img/fonts_cjgjc.png')} alt="抽奖关键词"/>
          <div styleName="keywords">
            {this.props.checkin ? this.renderCheckin() : this.renderKeywords()}
          </div>
        </div>
        <div styleName="bg-bottom"/>
      </div>
    );
  }
}

Keywords.propTypes = {
  startAni: PropTypes.bool,
  keywords: PropTypes.array,
  checkin: PropTypes.bool
};

Keywords.defaultProps = {
  startAni: false,
  keywords: ['敬业', '健康', '上进', '成长', '努力', '充实'],
  checkin: false
};

export default Keywords;
