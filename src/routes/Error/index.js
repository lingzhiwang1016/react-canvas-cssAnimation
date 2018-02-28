import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  render() {
    return (
      <div className="bg" styleName="error">
        <img src={require('@/img/error.png')} alt="万科春节晚会欢迎您"/>
      </div>
    );
  }
}

Index.propTypes = {};

export default connect()(Index);
