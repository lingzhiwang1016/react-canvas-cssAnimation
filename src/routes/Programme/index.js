import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import WxImageViewer from 'react-wx-images-viewer';

// 引入组件
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
    logger.log("props", props);
    this.state = {
      // initing: true,
      imageViewOpen: false,
      imagesList: [],
      imagesListIndex: 0
    };
  }

  componentWillMount() {
    const imagesListTemp = [];
    config.programs.forEach(elem => {
      imagesListTemp.push(elem.imgUrl);
    });
    this.setState({
      imagesList: imagesListTemp
    });
    allSignUpCount().then(res => {
      logger.log("allSignUpCount res", res);
    }).catch(err => {
      logger.log("allSignUpCount err", err);
    });
    // .finally(() => {
    //   this.setState({
    //     initing: false
    //   });
    // });
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
