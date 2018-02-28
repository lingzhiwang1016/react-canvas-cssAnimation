import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import QueueAnim from 'rc-queue-anim';

import Title from "@/components/Title";
// import Card from "@/components/Card";
import styles from "./index.css";


@CSSModules(styles, { allowMultiple: true })

class Keywords extends React.Component {
  // 已签到显示页面
  renderCheckin() {
    // if (this.props.keywords.length === 0) return;
    const items = this.props.keywords.map((keyword, index) =>
      <div styleName={"card target-state" + (index + 1)} key={index}>{keyword}</div>);
    return (
      <div styleName="keywords-container">
        <img src={require('@/img/fonts_cjgjc.png')} alt="抽奖关键词"/>
        <div styleName="keywords">
          <div>
            {items}
          </div>
        </div>
      </div>
    );
  }

  // 第一次签到成功渲染页面
  renderKeywords() {
    // 未签到的时候，也没有抽奖词，但是为了动画显示也要显示一个空架子
    // if (this.props.keywords.length === 0) return;
    const items = this.props.keywords.map((keyword, index) =>
      <div styleName={"card init-state animate" + (index + 1)} key={index}>{keyword}</div>);
    return (
      <div styleName="keywords-container">
        <img src={require('@/img/fonts_cjgjc.png')} alt="抽奖关键词"/>
        <div styleName="keywords">
          <div>
            {this.props.startAni && <div>{items}</div>}
          </div>
        </div>
      </div>
    );
  }

  renderLotteryKeywords() {
    console.log('***********', this.props.prizeInfo);
    const items = this.props.prizeInfo.lotteryWords.map((keyword, index) =>
      <div styleName="final-keywords-item" key={index}>{keyword}</div>);
    return (
      <div styleName="final-keywords-content">
        {items}
      </div>
    );
  }

  render() {
    return (
      <div styleName="card-main">
        <div styleName="bg-top"/>
        {
          this.props.lottery &&
          <div>
            <div styleName="final-keywords">
              <Title img={require('@/img/fonts_xwcwgjc.png')} name="厦万春晚关键词"/>
              {this.renderLotteryKeywords()}
            </div>
            <div styleName="bg-dashed"/>
            <div styleName="congradulate">
              {
                this.props.keywords && this.props.keywords.length > 0 ?
                  (
                    <div styleName="congradulate-content">
                      <p>获得{this.props.prizeInfo.prizeName}</p>
                      <p>兑奖码: {this.props.prizeInfo.prizeCodeStr}</p>
                      <div styleName="awards">
                        {this.props.prizeInfo.prizeLevel}
                      </div>
                    </div>
                  )
                  :
                  null
              }
            </div>
          </div>
        }
        {this.props.checkin ? this.renderCheckin() : this.renderKeywords()}
        {
          this.props.lottery &&
          <div styleName="get-ward-rules">
            <Title img={require('@/img/djxz.png')} name="兑换须知"/>
            <p>1、 兑奖时间：2月9日（周五）、11日（周日）、12日（周一）早上9:00-12:30，下午14:00-18:00</p>
            <p>2、 兑奖地点：云玺领航3楼国际会议中心V8 CD厅</p>
            <p>3、 兑奖方式：凭个人手机里H5显示的“姓名+奖品等级+奖品名称”，及个人手机号领取。</p>
            <p>4、 联系人：姜钰樱18606000559（微信号）、陆巧琳13599501003（微信号）</p>
            {/*<p>1.获得专属关键词：以上6个属于您的2018关键词, 将是您2018厦万春晚抽奖的专属兑奖关键词! </p>*/}
            {/*<p>2.嘉宾抽取关键词：春晚现场将有6轮抽奖环节, 每轮将由一位嘉宾抽出一个关键词; 当6轮抽奖环节结束后, 被抽出的6个关键词就是2018厦万春晚的中奖关键词! </p>*/}
          </div>
        }
        <div styleName="bg-bottom"/>
      </div>
    );
  }
}

Keywords.propTypes = {
  lottery: PropTypes.bool,
  prizeInfo: PropTypes.object,
  startAni: PropTypes.bool,
  keywords: PropTypes.array,
  checkin: PropTypes.bool
};

Keywords.defaultProps = {
  prizeInfo: {
    lotteryWords: ['合伙', '奋斗', '春晚', '加班', '周末', '春晚'],
    prizeLevel: '二等奖',
    prizeName: '鱼羊市集大礼包',
    prizeCodeStr: ''
  },
  lottery: false,
  startAni: false,
  keywords: ['敬业', '健康', '上进', '成长', '努力', '充实'],
  checkin: false
};

export default Keywords;
