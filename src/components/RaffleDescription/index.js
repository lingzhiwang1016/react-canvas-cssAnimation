import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";

import Title from "@/components/Title";
import styles from "./index.css";

@CSSModules(styles)

class RaffleDescription extends React.Component {
  render() {
    return (
      <div>
        <Title img={require('@/img/title_cjhjsm.png')} name="抽奖环节说明"/>
        <div styleName="raffle-description">
          <p>1. 获得专属关键词：以上6个属于您的2018关键词，将是您2018厦万春晚抽奖的专属兑奖关键词！</p>
          <p>2. 嘉宾抽取关键词：春晚现场将有6轮抽奖环节，每轮将由一位嘉宾抽出一个关键词；当6轮抽奖环节结束后，被抽出的6个关键词就将是2018厦万春晚的中奖关键词！</p>
          <p>3. 兑奖说明：系统将统计您的专属兑奖关键词与嘉宾抽取的中奖关键词是否相同（关键词相同即可，不计排列顺序）；相同的词数越多，奖项越高！</p>
          <p>
            【特等奖】——6个关键词全部相同 <br/>
            【一等奖】——5个关键词相同 <br/>
            【二等奖】——4个关键词相同 <br/>
            【三等奖】——3个关键词相同 <br/>
            【四等奖】——2个关键词相同 <br/>
            【五等奖】——1个关键词相同 <br/>
          </p>
        </div>
      </div>
    );
  }
}

RaffleDescription.propTypes = {
};

export default RaffleDescription;
