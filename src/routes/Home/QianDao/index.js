import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import { Toast, ActivityIndicator, Flex, Button } from "antd-mobile";

import weixin from "@/utils/weixin";
// 引入组件
import { PrizeLevels } from "@/conf/constants";
import Title from "@/components/Title";
import Card from "@/components/Card";
import RaffleDescription from "@/components/RaffleDescription";
import Keywords from "@/components/Keywords";
import GetKeywords from "@/components/GetKeywords";
import SloganSmall from "@/components/SloganSmall";

import { qiandao, testQiandao, qiandaoStatus, prizeInfo, prizeOpen } from "@/services/auth";
import logger from "@/utils/logger";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initing: true, // 是否在初始化
      checkin: false, // 是否签到
      keywords: [], // 用户抽奖码
      cardShow: true, // 领取卡片
      maskShow: true, // 领取卡片蒙版
      cardAniStart: false, // 动画开关
      lottery: false,
      prizeInfo: {
        lotteryWords: ['春晚', '春晚', '春晚', '春晚', '春晚', '春晚'],
        prizeLevel: '二等奖',
        prizeName: '鱼羊市集大礼包',
        prizeCodeStr: ''
      }
    };
  }

  componentWillMount() {
    // 获取是否签到
    qiandaoStatus().then(res => {
      logger.log('未签到', res);
      this.setState({
        initing: false,
        checkin: false
      });
    }).catch(err => {
      logger.log('已签到', err);
      this.getKeywords(err);
      this.setState({
        initing: false,
        checkin: true
      });
    });
    // 获取开奖数据
    prizeInfo().then(res => {
      const _prizeInfo = this.handlePrizeInfo(res);
      this.setState({
        lottery: true,
        prizeInfo: _prizeInfo
      });
      logger.log('厦万春晚关键词-成功', res);
    }).catch(err => {
      logger.log('厦万春晚关键词-未开奖', err);
      if (err.code === "B30007") {
        logger.log('厦万春晚关键词-未开奖', err);
      }
    });
  }

  componentDidMount() {
    weixin().then(res => {
      logger.log("res", res);
    }).catch(err => {
      logger.warn("err", err);
    });
  }

  // 获取服务器Keywords放入state
  getKeywords(res, type) {
    let keywordsString;
    if (type === 1) {
      keywordsString = res.data.code;
    } else {
      keywordsString = res.data.data.code;
    }
    const keywordsArray = keywordsString.split(',');
    this.setState({ keywords: keywordsArray });
  }

  // 签到功能
  checkIn() {
    qiandao().then(res => {
      logger.log('签到成功', res);
      this.getKeywords(res, 1);
      this.setState({
        checkin: false
      });
    }).catch(err => {
      // B20006 的重复签到的情况不该再出现
      logger.log('签到失败', err);
      Toast.info(err.message);
      logger.log("qiandao err", err);
      this.setState({
        initing: false,
        checkin: false
      });
    });
  }

  // 处理获奖数据
  handlePrizeInfo(res) {
    // 奖项约定
    const data = res.data;
    // 后台返回的开奖词数组
    const winningWords = data.winningWords;
    const _prizeName = data.prizeInfo && data.prizeInfo.prizeName;
    const _prizeLevel = PrizeLevels[data.prizeInfo && data.prizeInfo.prizeLevel];
    const _prizeCodeStr = data.prizeInfo && data.prizeInfo.prizeCodeStr;
    // 待返回的开奖词数组
    const _lotteryWords = [];
    winningWords.forEach(elem => {
      _lotteryWords.push(elem.wordName);
    });
    return {
      lotteryWords: _lotteryWords,
      prizeLevel: _prizeLevel,
      prizeName: _prizeName,
      prizeCodeStr: _prizeCodeStr
    };
  }

  /*
   *点击领取触发回调
   */
  hiddenPop = () => {
    this.checkIn();
    this.setState({
      cardShow: false
    });
  }
  /*
   *领取卡片动画消失回调函数
   */
  cardEnd = (obj) => {
    if (obj.type === 'leave') {
      this.setState({
        maskShow: false,
        cardAniStart: true
      });
    }
  }

  // 测试开奖接口
  testPrizeOpen() {
    logger.log('开始开奖');
    prizeOpen().then(res => {
      logger.log('开奖成功', res);
    }).catch(err => {
      logger.log('开奖失败', err);
    });
  }

  renderLoading() {
    return (
      <div styleName="content">
        <ActivityIndicator text="正在处理中"/>
      </div>
    );
  }

  renderSuccess() {
    const { loginUser } = this.props.auth;
    return (
      <div className="bg">
        {/*<button onClick={this.testPrizeOpen}>luo</button>*/}
        <SloganSmall/>
        <Keywords
          keywords={this.state.keywords}
          checkin={this.state.checkin}
          startAni={this.state.cardAniStart}
          lottery={this.state.lottery}
          prizeInfo={this.state.prizeInfo}
        />
        {
          !this.state.lottery ? <RaffleDescription/> : null
        }
        {
          !this.state.checkin ?
            <GetKeywords
              cardShow={this.state.cardShow}
              maskShow={this.state.maskShow}
              onClick={this.hiddenPop}
              onEnd={this.cardEnd}
            /> : null
        }
      </div>
    );
  }

  render() {
    if (this.state.initing) {
      return this.renderLoading();
    } else {
      return this.renderSuccess();
    }
  }
}

Index.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Index);

