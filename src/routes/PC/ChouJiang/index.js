import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import logger from "@/utils/logger";
import { allWords, lottery_word_result, prizeOpen } from "@/services/auth";

import styles from "./index.css";

import Card from "./card.js";
import ShanDian from "./shanDian.js";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allWords: [],
      wordResult: [],
      approach: true,
      cardIndex: 0
    };
  }

  componentWillMount() {
    this.initData();
    this.handleScroll();
  }

  componentDidMount() {
  }

  openPrize() {
    logger.log('开始开奖...');
    prizeOpen().then(res => {
      logger.log('开奖成功', res);
    }).catch(err => {
      logger.log('开奖失败', err);
    });
  }

  handleScroll() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 49 && e.altKey) {
        this.setState({
          cardIndex: this.state.cardIndex + 1
        });
        switch (this.state.cardIndex) {
          case 1:
            this.card1.moveToCenter();
            this.maskShow();
            break;
          case 2:
            this.card1.startScroll();
            break;
          case 3:
            this.card1.stopScroll();
            break;
          case 4:
            this.card1.moveBack();
            this.maskHide();
            break;
          case 5:
            this.card2.moveToCenter();
            this.maskShow();
            break;
          case 6:
            this.card2.startScroll();
            break;
          case 7:
            this.card2.stopScroll();
            break;
          case 8:
            this.card2.moveBack();
            this.maskHide();
            break;
          case 9:
            this.card3.moveToCenter();
            this.maskShow();
            break;
          case 10:
            this.card3.startScroll();
            break;
          case 11:
            this.card3.stopScroll();
            break;
          case 12:
            this.card3.moveBack();
            this.maskHide();
            break;
          case 13:
            this.card4.moveToCenter();
            this.maskShow();
            break;
          case 14:
            this.card4.startScroll();
            break;
          case 15:
            this.card4.stopScroll();
            break;
          case 16:
            this.card4.moveBack();
            this.maskHide();
            break;
          case 17:
            this.card5.moveToCenter();
            this.maskShow();
            break;
          case 18:
            this.card5.startScroll();
            break;
          case 19:
            this.card5.stopScroll();
            break;
          case 20:
            this.card5.moveBack();
            this.maskHide();
            break;
          case 21:
            this.card6.moveToCenter();
            this.maskShow();
            break;
          case 22:
            this.card6.startScroll();
            break;
          case 23:
            this.card6.stopScroll();
            this.openPrize();
            break;
          case 24:
            this.card6.moveBack();
            this.maskHide();
            break;
          default:
            break;
        }
      }
    });
  }

  initData() {
    allWords().then((res) => {
      const words = [res.data, res.data, res.data, res.data, res.data, res.data];
      this.setState({
        allWords: words
      });
      logger.log("allWords", words);
    });
    lottery_word_result().then((res) => {
      const wordResult = res.data;
      this.setState({
        wordResult: wordResult
      });
      logger.log("wordResult", wordResult);
    });
  }

  maskShow = () => {
    this.mask.style.opacity = "0.6";
  }
  maskHide = () => {
    this.mask.style.opacity = "0";
  }
  handleClick = () => {
    console.log(2);
    this.setState({
      approach: true
    }, () => console.log(this.state.approach));
    console.log(this.state.approach);
  }

  render() {
    return (
      <div styleName="container">
        <ShanDian/>
        <div styleName="mask" ref={(dom) => this.mask = dom}/>
        {
          this.state.approach &&
          <div>
            <Card position={{ left: "8.7%", top: "50.5%" }} allWords={this.state.allWords[0]} wordResult={this.state.wordResult[0]} card_container="card_container1" ref={(dom) => this.card1 = dom}/>
            <Card position={{ left: "22.9%", top: "48.1%" }} allWords={this.state.allWords[1]} wordResult={this.state.wordResult[1]} card_container="card_container2" ref={(dom) => this.card2 = dom}/>
            <Card position={{ left: "37.2%", top: "50.9%" }} allWords={this.state.allWords[2]} wordResult={this.state.wordResult[2]} card_container="card_container3" ref={(dom) => this.card3 = dom}/>
            <Card position={{ left: "51.4%", top: "47.3%" }} allWords={this.state.allWords[3]} wordResult={this.state.wordResult[3]} card_container="card_container4" ref={(dom) => this.card4 = dom}/>
            <Card position={{ left: "65.2%", top: "53.1%" }} allWords={this.state.allWords[4]} wordResult={this.state.wordResult[4]} card_container="card_container5" ref={(dom) => this.card5 = dom}/>
            <Card position={{ left: "79.9%", top: "49%" }} allWords={this.state.allWords[5]} wordResult={this.state.wordResult[5]} card_container="card_container6" ref={(dom) => this.card6 = dom}/>
          </div>
        }
        {/*<button onClick={this.handleClick} style={{ position: "absolute", zIndex: 999999 }}>按钮</button>*/}
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
