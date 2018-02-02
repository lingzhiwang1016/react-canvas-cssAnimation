import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import logger from "@/utils/logger";
import PropTypes from 'prop-types';

import styles from "./index.css";

@CSSModules(styles, { allowMultiple: true })
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      departmentName: '',
      entryDays: null,
      name: '',
      // position: null
    };
  }

  componentWillMount() {
  }

  componentDidMount() {}

  qiandao = (userInfo) => {
    for (const key in this.state) {
      logger.log(userInfo[key]);
      this.setState({ [key]: userInfo[key] });
    }
    this.person_card.classList.add('animation_card_replay');
    if (this.person_card.classList.contains('animation_card_play')) {
      this.person_card.classList.remove('animation_card_play');
      this.person_card.classList.add('animation_card_replay');
    } else {
      this.person_card.classList.remove('animation_card_replay');
      this.person_card.classList.add('animation_card_play');
    }
    if (this.person_img.classList.contains('animation_img_play')) {
      this.person_img.classList.remove('animation_img_play');
      this.person_img.classList.add('animation_img_replay');
    } else {
      this.person_img.classList.remove('animation_img_replay');
      this.person_img.classList.add('animation_img_play');
    }
    logger.log(this.state.departmentName);
  }


  render() {
    return (
      <ul styleName="person_card" ref={(dom) => this.person_card = dom}>
        <li styleName="person_img" className="person_img_play" ref={(dom) => this.person_img = dom}>
          <img src={this.state.avatar} alt="個人頭像"/>
        </li>
        <li styleName="person_info">
          <div styleName="person_name">{this.state.name}</div>
          <div>部门:{this.state.departmentName}</div>
          {/* <div>岗位：{this.state.position}</div> */}
          <div>时长:入职万科{this.state.entryDays}天</div>
        </li>
      </ul>
    );
  }
}

Index.propTypes = {};

export default Index;
