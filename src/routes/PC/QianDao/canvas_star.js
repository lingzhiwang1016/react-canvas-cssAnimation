import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import logger from "@/utils/logger";
import { allSignUp } from "@/services/auth";
import html5_3d_animation from "./ext/html5_3d_animation.js";
import cosmos_canvas from "./ext/cosmos_canvas.js";
import stars from "./ext/stars.js";

import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onResize = () => {
    this.handerStar();
  }

  handerStar() {
    this.renderStar1();
  }

  renderStar1() {
    html5_3d_animation(document.getElementById("html5_3d_animation"), {
      window_width: window.innerWidth,
      window_height: window.innerHeight,
      star_count: 1500,
      star_color: '#59FCFF',
      star_depth: 100,
    });
  }

  renderStar2() {
    cosmos_canvas("html5_3d_animation", 230, 1000, 60, 2, 50000, 0.5);
  }

  renderStar3() {
    stars("html5_3d_animation");
  }

  render() {
    return (
      <canvas id="html5_3d_animation">Internet Explorer 8 Not Supported</canvas>
    );
  }
}

Index.propTypes = {};

export default Index;
