import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import navigate from "@/utils/navigate";
import Title from "@/components/Title";
import styles from "./index.css";

@CSSModules(styles)
class Invitation extends React.Component {
  onNavigate = () => {
    navigate(this.props.position);
  }

  render() {
    const { userCount } = this.props;
    const l4 = userCount % 10;
    const l3 = userCount / 10 % 10;
    const l2 = userCount / 100 % 10;
    const l1 = userCount / 1000 % 10;
    return (
      <div styleName="invitation">
        <div styleName="bg-top"/>
        <div styleName="welcome">
          <img src={require("@/img/font_yqh.png")} alt="邀请函"/>
          <p>亲爱的{this.props.userName}，厦门万科隆重邀请您参加</p>
          <div styleName="big-title">2018遇见美好厦门万科春晚</div>
          <div styleName="p-list">
            <span styleName="title">时间:</span>2018年2月8日
          </div>
          <div styleName="p-list">
            <span styleName="title"/><span styleName="sub-title">全员大会</span>
          </div>
          <div styleName="p-list">
            <span styleName="title"/>08:00 — 09:00 全员大会签到及互动
          </div>
          <div styleName="p-list">
            <span styleName="title"/>09:00 — 12:30 全员大会各项议程
          </div>
          <div styleName="p-list">
            <span styleName="title"/><span styleName="sub-title">春晚部分</span>
          </div>
          <div styleName="p-list">
            <span styleName="title"/>12:30 — 17:00 自由活动、春晚换装
          </div>
          <div styleName="p-list">
            <span styleName="title"/>17:00 — 19:00 红毯入场
          </div>
          <div styleName="p-list">
            <span styleName="title"/>19:00 — 22:30 春晚演出
          </div>
          <div styleName="p-list">
            <span styleName="title">地点:</span>厦门国际会议展览中心B3馆
            <span styleName="guide" onClick={this.onNavigate}>
              <img src={require('@/img/icon_location.png')} alt="导航"/>
              <span styleName="font-daohang">导航</span>
            </span>
          </div>
        </div>
        <div styleName="bg-dashed"/>
        <div styleName="number">
          <Title img={require('@/img/font_ybm.png')} name="当前已报人数"/>
          <ul>
            <li>{Math.floor(l1)}</li>
            <li>{Math.floor(l2)}</li>
            <li>{Math.floor(l3)}</li>
            <li>{Math.floor(l4)}</li>
          </ul>
        </div>
        <div styleName="bg-bottom"/>
      </div>
    );
  }
}

Invitation.propTypes = {
  userName: PropTypes.string,
  position: PropTypes.object.isRequired,
  userCount: PropTypes.number.isRequired,
};
Invitation.defaultProps = {
  userName: '万科同学'
};

export default Invitation;
