import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from 'prop-types';
import logger from "@/utils/logger";
import utils from "@/utils/utils";

import styles from "./index.css";
import defaultAvatar from "./img/p.jpg";

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

@CSSModules(styles)
class Index extends React.Component {
  static defaultProps = {
    allUsers: []
  }
  static propTypes = {
    allUsers: PropTypes.array
  }

  constructor(props) {
    super(props);
    const arr = config.split("\n");
    const scale = 25;
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
  }

  componentWillReceiveProps(nextProps) {
    logger.log("componentWillReceiveProps", nextProps);
    this.handerAllPhoto(nextProps.allUsers);
  }

  componentWillUnmount() {
  }

  onResize = () => {
    this.handerAllPhoto(this.props.allUsers);
  }

  handerDrawPhoto(x, y, w, h, padding, ctx, userInfo) {
    const photo = new Image();
    if (userInfo && userInfo.avatar) {
      photo.src = utils.aliossWithStyle(userInfo.avatar);
    } else {
      photo.src = defaultAvatar;
    }

    // const into = document.createElement("canvas");
    // const ctx2 = into.getContext("2d");
    // into.width = w - padding;
    // into.height = h - padding;
    photo.onload = function () {
      // ctx2.drawImage(photo, 0, 0, w - padding, h - padding);
      // const pattern = ctx.createPattern(into, "repeat");
      // ctx.beginPath();
      // // ctx.arc(x * w + (w - padding) / 2, y * h + (w - padding) / 2, (w - padding) / 2, 0, 2 * Math.PI);
      // ctx.fillRect(x * w, y * h, w - padding, h - padding);
      // ctx.fillStyle = pattern;
      // ctx.fill();
      // ctx.closePath();

      ctx.drawImage(photo, x * w, y * h, w - padding, h - padding);
    };
  }

  handerAllPhoto(userPhotos) {
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
          this.handerDrawPhoto(j, i, scale, scale, padding, ctx, userPhotos[imgIndex]);
          imgIndex++;
        }
      }
    }

    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(13,0,71,0.5)";
    ctx.shadowOffsetX = 30;
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
