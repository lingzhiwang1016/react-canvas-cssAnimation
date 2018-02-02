import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import { Toast, ActivityIndicator, Flex, Button } from "antd-mobile";

// 引入组件
import Title from "@/components/Title";
import Card from "@/components/Card";
import RaffleDescription from "@/components/RaffleDescription";
import Keywords from "@/components/Keywords";
import GetKeywords from "@/components/GetKeywords";
import SloganSmall from "@/components/SloganSmall";

import { qiandao, testQiandao } from "@/services/auth";
import logger from "@/utils/logger";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initing: true,
      success: true,
      checkin: false,
      errMsg: "",
      keywords: [],
      cardShow: true,
      maskShow: true,
      cardAniStart: false
    };
  }

  componentWillMount() {
    qiandao().then(res => {
      logger.log('签到成功', res);
      this.getKeywords(res, 1);
      this.setState({
        initing: false,
        success: true,
        checkin: false
      });
    }).catch(err => {
      logger.log('您已报名', err);
      this.getKeywords(err);
      logger.log(err.code);
      if (err.code === "B20006") {
        this.setState({
          initing: false,
          success: true,
          checkin: true,
        });
      } else {
        Toast.info(err.message);
        logger.log("qiandao err", err);
        this.setState({
          initing: false,
          success: false,
          checkin: false,
          errMsg: err.message
        });
      }
    });
  }

  onTestQianDao = () => {
    const { loginUser } = this.props.auth;
    testQiandao(loginUser.telephone).then(res => {
      logger.log("testQiandao res", res);
      Toast.success("成功");
    }).catch(err => {
      logger.log("testQiandao err", err);
      Toast.success(err.message);
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
  /*
   *点击领取触发回调
   */
  hiddenPop = () => {
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
        <SloganSmall/>
        <Keywords
          keywords={this.state.keywords}
          checkin={this.state.checkin}
          startAni={this.state.cardAniStart}
        />
        <RaffleDescription/>
        {!this.state.checkin && <GetKeywords
          cardShow={this.state.cardShow}
          maskShow={this.state.maskShow}
          onClick={this.hiddenPop}
          onEnd={this.cardEnd}
        />}
      </div>
    );
  }

  renderFail() {
    return (
      <div styleName="content">
        fail:{this.state.errMsg}
      </div>
    );
  }

  render() {
    if (this.state.initing) {
      return this.renderLoading();
    } else if (this.state.success) {
      return this.renderSuccess();
    } else {
      return this.renderFail();
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

