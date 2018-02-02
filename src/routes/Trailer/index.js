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
  render() {
    const { loginUser } = this.props.auth;
    return (
      <div className="bg" styleName="bg-trailer">
        <SloganSmall/>
        <Title img={require('@/img/title_ylsp.png')} name="预热视频"/>
        <Video config={config.video}/>
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
