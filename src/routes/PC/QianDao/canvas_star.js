import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from 'prop-types';
import logger from "@/utils/logger";
import html5_3d_animation from "./ext/html5_3d_animation.js";

import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  static defaultProps = {
    starUrls: []
  }
  static propTypes = {
    starUrls: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.starAnim = null;
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.starAnim = html5_3d_animation(document.getElementById("html5_3d_animation"), {
      window_width: window.innerWidth,
      window_height: window.innerHeight,
      star_urls: this.props.starUrls
    });
  }

  componentWillReceiveProps(nextProps) {
    logger.log("stars componentWillReceiveProps", nextProps);
    if (nextProps.starUrls && this.starAnim) {
      this.starAnim.setUrls(nextProps.starUrls);
    }
  }

  componentWillUnmount() {
  }

  onResize = () => {
    logger.log("stars onResize");
    if (this.starAnim) {
      this.starAnim.reseize(window.innerWidth, window.innerHeight);
    }
  }

  // renderStar2() {
  //   cosmos_canvas("html5_3d_animation", 230, 1000, 60, 2, 50000, 0.5);
  // }
  //
  // renderStar3() {
  //   stars("html5_3d_animation");
  // }

  render() {
    return (
      <canvas id="html5_3d_animation">Internet Explorer 8 Not Supported</canvas>
    );
  }
}

Index.propTypes = {};

export default Index;
