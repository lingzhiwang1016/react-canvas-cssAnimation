import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";

import Title from "@/components/Title";
// import Card from "@/components/Card";
import styles from "./index.css";


@CSSModules(styles, { allowMultiple: true })

class Keywords extends React.Component {
  // componentDidMount() {
  //   const card = document.querySelector('.ai');
  //   card.className = 'animate6';
  // }
  renderAni = () => {
    return (
      <div>
        <div styleName="card init-state animate6">会</div>
        <div styleName="card init-state animate5">晚</div>
        <div styleName="card init-state animate4">节</div>
        <div styleName="card init-state animate3">春</div>
        <div styleName="card init-state animate2">科</div>
        <div styleName="card init-state animate1">万</div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Title img={require('@/img/title_cjgjc.png')} name="2018抽奖关键词"/>
        <div styleName="keywords">
          <div styleName="card init-state animate6">
            <img src={require('@/img/font_hui.png')} alt="会"/>
          </div>
          <div styleName="card init-state animate5">
            <img src={require('@/img/font_wan.png')} alt="晚"/>
          </div>
          <div styleName="card init-state animate4">
            <img src={require('@/img/font_jie.png')} alt="节"/>
          </div>
          <div styleName="card init-state animate3">
            <img src={require('@/img/font_chun.png')} alt="春"/>
          </div>
          <div styleName="card init-state animate2">
            <img src={require('@/img/font_ke.png')} alt="科"/>
          </div>
          <div styleName="card init-state animate1">
            <img src={require('@/img/font_wang.png')} alt="万"/>
          </div>
        </div>
      </div>
    );
  }
}

Keywords.propTypes = {
};

export default Keywords;
