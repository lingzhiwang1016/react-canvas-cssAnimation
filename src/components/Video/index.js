import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";

import styles from "./index.css";

@CSSModules(styles)
class Video extends React.Component {
  componentDidMount() {
    this.video.play();
  }
  render() {
    const { src, poster } = this.props.config;
    return (
      <div>
        <video
          ref={(dom) => this.video = dom}
          styleName="video"
          src={src}
          poster={poster}
          // preload="auto"
          controls
          x5-video-player-type="h5"
          playsInline="true"
          autoPlay="auotPlay"
        >
          您的浏览器不支持 video 标签。
          <track kind="captions" src="#" srcLang="zh" label="Chinese" default/>
        </video>
      </div>
    );
  }
}

Video.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Video;
