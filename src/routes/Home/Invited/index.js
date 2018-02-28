import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import WxImageViewer from 'react-wx-images-viewer';

// 引入组件
import Invitation from "@/components/Invitation";
import Programme from "@/components/Programme";
import SloganSmall from "@/components/SloganSmall";
import weixin from "@/utils/weixin";
import Title from "@/components/Title";
import config from "@/conf/invitation.js";
import Video from "@/components/Video";

import { allSignUpCount } from "@/services/auth";
import logger from "@/utils/logger";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    logger.log("props", props);
    this.state = {
      userCount: 0,
      imageViewOpen: false,
      imagesList: [],
      imagesListIndex: 0,
      videoPlay: false,
      videoPlay2: false
    };
  }

  componentWillMount() {
    document.title = "厦门万科春晚邀请函";
    const imagesListTemp = [];
    config.programs.forEach(elem => {
      imagesListTemp.push(elem.imgUrl);
    });
    this.setState({
      imagesList: imagesListTemp
    });
    allSignUpCount().then(res => {
      logger.log("allSignUpCount res", res);
      this.setState({
        userCount: res.data
      });
    }).catch(err => {
      logger.log("allSignUpCount err", err);
    });
    // .finally(() => {
    //   this.setState({
    //     initing: false
    //   });
    // });
  }

  componentDidMount() {
    weixin().then(res => {
      logger.log("res", res);
    }).catch(err => {
      logger.warn("err", err);
    });
  }

  onClose = () => {
    this.setState({
      imageViewOpen: false
    });
  }
  imgClick = (index) => {
    this.setState({
      imagesListIndex: index,
      imageViewOpen: true
    });
  }

  render() {
    const { loginUser } = this.props.auth;
    return (
      <div className="bg">
        <SloganSmall/>
        <Invitation userName={loginUser.name} userCount={this.state.userCount} position={config.position}/>
        {
          this.state.videoPlay &&
          <div styleName="video-container">
            <div styleName="touch-area" onClick={() => this.setState({ videoPlay: false })}/>
            <Video config={config.video}/>
            <div styleName="touch-area" onClick={() => this.setState({ videoPlay: false })}/>
          </div>
        }
        {
          this.state.videoPlay2 &&
          <div styleName="video-container">
            <div styleName="touch-area" onClick={() => this.setState({ videoPlay2: false })}/>
            <Video config={config.video2}/>
            <div styleName="touch-area" onClick={() => this.setState({ videoPlay2: false })}/>
          </div>
        }
        <Title img={require('@/img/title_ylsp.png')} name="预热视频"/>
        <div styleName="video-start" onClick={() => this.setState({ videoPlay: true })}/>
        <div styleName="video-start" onClick={() => this.setState({ videoPlay2: true })}/>
        {/*<Video config={config.video}/>*/}
        <Programme onClick={this.imgClick} programs={config.programs}/>
        {
          this.state.imageViewOpen ? <WxImageViewer onClose={this.onClose} urls={this.state.imagesList} index={this.state.imagesListIndex}/> : ""
        }
        <div styleName="space-padding"/>
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
