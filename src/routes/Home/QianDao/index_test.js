import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import { Toast, ActivityIndicator, Flex, Button } from "antd-mobile";

// 引入组件
import Title from "@/components/Title";
import Slogan from "@/components/Slogan";
import Card from "@/components/Card";
import RaffleDescription from "@/components/RaffleDescription";
import Keywords from "@/components/Keywords";

import { qiandao, testQiandao } from "@/services/auth";
import logger from "@/utils/logger";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initing: false,
      success: true,
      errMsg: ""
    };
  }

  componentWillMount() {
    qiandao().then(res => {
      logger.log("qiandao res", res);
      this.setState({
        success: true
      });
    }).catch(err => {
      if (err.code === "B20006") {
        this.setState({
          success: true
        });
      } else {
        Toast.info(err.message);
        logger.log("qiandao err", err);
        this.setState({
          success: false,
          errMsg: err.message,
        });
      }
    });
    // .finally(() => {
    //   this.setState({
    //     initing: false
    //   });
    // });
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
  };

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
        <Button onClick={this.onTestQianDao}>无限签到</Button>
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

