import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";

// 引入组件
import Invitation from "@/components/Invitation";
import Title from "@/components/Title";
import Video from "@/components/Video";
import Programme from "@/components/Programme";
import SloganSmall from "@/components/SloganSmall";
import config from "@/conf/invitation.js";

import { allSignUpCount } from "@/services/auth";
import logger from "@/utils/logger";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPlay: false
    };
  }
  render() {
    const { loginUser } = this.props.auth;
    return (
      <div styleName="bg-trailer">
        <SloganSmall/>
        {
          this.state.videoPlay &&
          <div styleName="video-container">
            <div styleName="touch-area" onClick={() => this.setState({ videoPlay: false })}/>
            <Video config={config.video2}/>
            <div styleName="touch-area" onClick={() => this.setState({ videoPlay: false })}/>
          </div>
        }
        <Title img={require('@/img/title_ylsp.png')} name="预热视频"/>
        <div styleName="video-start" onClick={() => this.setState({ videoPlay: true })}/>
      </div>
    );
  }
}

Index.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Index);
