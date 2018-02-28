import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import { Button, Toast } from "antd-mobile";
import logger from "@/utils/logger";
import ReconnectingWebSocket from "@/ext/reconnecting-websocket";
import { allSignUp } from "@/services/auth";
import config from "@/conf/config";
import utils from "@/utils/utils";

import styles from "./index.css";

// 组件
import CanvasVANK from "./canvas_VANK.js";
import PersonCard from "./person_card.js";
import CanvasStar from "./canvas_star.js";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: []
    };
    this.taskTimer = null;
    this.lastTaskTime = 0;
    this.TaskInterval = 5000;
    this.tasks = [];
  }

  componentWillMount() {
    // 建立socket连接
    this.connect();
    // 初始化报名用户
    allSignUp().then(res => {
      logger.log("allSignUp res", res);
      this.setState({
        allUsers: res.data
      });
    }).catch(err => {
      logger.log("allSignUp err", err);
    });
  }

  componentDidMount() {
    this.onResize();
    window.onresize = () => {
      this.onResize();
    };
    this.taskTimer = setInterval(this.processTasks, 200);
    this.heartbeatTimer = null;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    clearInterval(this.taskTimer);
  }

  onResize = () => {
    this.CanvasStar && this.CanvasStar.onResize();
    this.CanvasVANK && this.CanvasVANK.onResize();
  }

  connect = () => {
    const websocket = new ReconnectingWebSocket(config.ws, null, { debug: true, maxReconnectAttempts: 4 });
    websocket.onopen = (evnt) => {
      logger.log("websocket连接上", evnt);
      if (this.heartbeatTimer) {
        clearInterval(this.heartbeatTimer);
      }
      websocket.send("heartbeat");
      this.heartbeatTimer = setInterval(() => {
        logger.log("发送心跳");
        websocket.send("heartbeat");
      }, 20000);
    };
    websocket.onmessage = (evnt) => {
      const data = JSON.parse(evnt.data);
      if (data instanceof Array) {
        logger.log("qiandao list", data);
      } else {
        // 有人签到
        logger.log("qiandao ", data.name);
        //Toast.info(`${data.name}签到了`);
        this.tasks.push(data);
      }
    };
    websocket.onerror = (evnt) => {
      logger.log("websocket错误", evnt);
    };
    websocket.onclose = (evnt) => {
      logger.log("websocket关闭", evnt);
    };
  }

  processTasks = () => {
    const now = Date.now();
    if (this.lastTaskTime) {
      if (now - this.lastTaskTime < this.TaskInterval) {
        return;
      }
    }
    if (this.tasks.length > 0) {
      const task = this.tasks.shift();
      this.PersonCard && this.PersonCard.qiandao(task);
      this.lastTaskTime = now;
    }
  }

  render() {
    const { allUsers } = this.state;
    const starUrls = allUsers.map(item => utils.aliossWithStyle(item.avatar, "round100"));
    const vankeUrls = allUsers.map(item => utils.aliossWithStyle(item.avatar, "c50"));
    return (
      <div styleName="container">
        <CanvasStar ref={(dom) => this.CanvasStar = dom} starUrls={starUrls}/>
        <CanvasVANK ref={(dom) => this.CanvasVANK = dom} urls={vankeUrls}/>
        <PersonCard ref={(dom) => this.PersonCard = dom}/>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
