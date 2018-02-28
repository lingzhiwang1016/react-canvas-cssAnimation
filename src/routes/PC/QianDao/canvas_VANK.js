import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from 'prop-types';
import logger from "@/utils/logger";

import styles from "./index.css";

const config = `1111........1111....1111.........1111.......1111...1111......11111...1111111111111..
1111.......1111.....11111........1111.......1111...1111.....11111....1111111111111..
1111.......1111....111111........11111......1111...1111....11111.....1111111111111..
.1111.....1111.....1111111.......111111.....1111...1111...11111......1111...........
.1111.....1111.....111.111.......111111.....1111...1111..11111.......1111...........
.1111.....1111....1111.111.......1111111....1111...1111..1111........1111...........
..111.....111.....1111.1111......1111111....1111...1111.1111.........1111...........
..1111...1111.....111..1111......11111111...1111...11111111..........111111111111...
..1111...1111....1111...111......1111.1111..1111...11111111..........111111111111...
...111...111.....1111...1111.....1111..111..1111...11111111..........111111111111...
...1111.1111.....111....1111.....1111..1111.1111...111111111.........1111...........
...1111.1111....111111111111.....1111...11111111...1111.11111........1111...........
...1111.111.....1111111111111....1111...11111111...1111..11111.......1111...........
....1111111.....1111111111111....1111....1111111...1111...11111......1111...........
....1111111....1111.......111....1111.....111111...1111....11111.....1111...........
....111111.....1111.......1111...1111.....111111...1111.....11111....1111111111111..
.....11111.....1111.......1111...1111......11111...1111......11111...1111111111111..
.....11111....1111.........1111..1111.......1111...1111.......11111..1111111111111..`;

const g_scale = 0.8;

@CSSModules(styles)
class Index extends React.Component {
  static defaultProps = {
    urls: []
  }
  static propTypes = {
    urls: PropTypes.array
  }

  constructor(props) {
    super(props);
    const arr = config.split("\n");
    const scale = 25 * g_scale;
    const width = arr[0].length * scale;
    const height = arr.length * scale;
    const padding = 2;
    this.state = {
      configs: arr,
      scale,
      width,
      height,
      padding
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // 设置动画
  }

  componentWillReceiveProps(nextProps) {
    logger.log("vanke componentWillReceiveProps", nextProps);
    if (nextProps.urls) {
      this.renderAllPhoto(nextProps.urls);
    }
  }

  componentWillUnmount() {
  }

  onResize = () => {
    this.renderAllPhoto(this.props.urls);
  }

  renderPhoto(x, y, w, h, padding, ctx, url) {
    if (url) {
      const photo = new Image();
      photo.src = url;
      photo.onload = function () {
        ctx.drawImage(photo, x * w, y * h, w - padding, h - padding);
      };
    }
  }

  renderAllPhoto(urls) {
    const {
      scale, width, height, configs, padding
    } = this.state;
    const ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    let imgIndex = 0;
    for (let i = 0; i < configs.length; i++) {
      for (let j = 0; j < configs[i].length; j++) {
        if (configs[i][j] === "1") {
          this.renderPhoto(j, i, scale, scale, padding, ctx, urls[imgIndex]);
          imgIndex++;
        }
      }
    }

    ctx.shadowBlur = 20 * g_scale;
    ctx.shadowColor = "rgba(13,0,71,0.5)";
    ctx.shadowOffsetX = 30 * g_scale;
    // ctx.shadowOffsetY = 10;
  }

  render() {
    return (
      <canvas styleName="canvas_VANK" width="600" height="200" ref={(dom) => this.canvas = dom}>画布展示</canvas>
    );
  }
}

Index.propTypes = {};

export default Index;
