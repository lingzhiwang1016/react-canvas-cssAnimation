import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import { ActivityIndicator } from "antd-mobile";
import PropTypes from "prop-types";
import queryString from "query-string";

import logger from "@/utils/logger";
import utils from "@/utils/utils";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    logger.log("login props", props);
    const parsed = queryString.parse(props.location.search);
    this.wechatState = parsed.state;
    this.wechatCode = parsed.code;
    logger.log("login wechatState", this.wechatState, this.wechatCode);
  }

  componentWillMount() {
    logger.log("proxy login state:", this.wechatState);
    const origin = utils.getOrigin(this.wechatState);
    logger.log("redirect to origin", origin);
    window.location.replace(`${origin}/login?code=${this.wechatCode}&state=${this.wechatState}`);
  }

  render() {
    return (
      <div styleName="content">
        <ActivityIndicator text="正在登录中"/>
      </div>
    );
  }
}

Index.propTypes = {
  location: PropTypes.object.isRequired,
};

export default connect()(Index);
