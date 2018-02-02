import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import logger from "@/utils/logger";

import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  render() {
    return (
      <div>
        <img styleName="shanDian1" src={require("./img/左侧闪电.png")} alt="" />
        <img styleName="shanDian2" src={require("./img/左侧图.png")} alt="" />
        <img styleName="shanDian3" src={require("./img/中间.png")} alt="" />
        <img styleName="shanDian4" src={require("./img/左侧闪电.png")} alt="" />
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
