import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import logger from "@/utils/logger";
import { allWords, lottery_word_result } from "@/services/auth";

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

      cardIndex: 0
    };
  }
  componentWillMount() {
    this.handerAllWords();
    this.handerWordResult();
    this.handleScroll();
  }
  componentDidMount() {}

  handleScroll() {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 49 && e.altKey) {
        this.setState({
          cardIndex: this.state.cardIndex + 1
        });
        switch (this.state.cardIndex) {
          case 1:
            this.card1.startScroll();
            break;
          case 2:
            this.card1.stopScroll();
            break;
          case 3:
            this.card2.startScroll();
            break;
          case 4:
            this.card2.stopScroll();
            break;
          case 5:
            this.card3.startScroll();
            break;
          case 6:
            this.card3.stopScroll();
            break;
          case 7:
            this.card4.startScroll();
            break;
          case 8:
            this.card4.stopScroll();
            break;
          case 9:
            this.card5.startScroll();
            break;
          case 10:
            this.card5.stopScroll();
            break;
          case 11:
            this.card6.startScroll();
            break;
          case 12:
            this.card6.stopScroll();
            break;
          default:
            break;
        }
      }
    });
  }
  handerAllWords() {
    allWords().then((res) => {
      this.setState({
        allWords: [res.data, res.data, res.data, res.data, res.data, res.data]
      });
      logger.log("allWords", this.state.allWords);
    });
  }
  handerWordResult() {
    lottery_word_result().then((res) => {
      this.setState({
        wordResult: res.data
      });
      const arr1 = this.state.allWords[0];
      const arr2 = arr1.filter((item) => {
        return item.wordName !== this.state.wordResult[0][2].wordName;
      });
      const arr3 = arr2.filter((item) => {
        return item.wordName !== this.state.wordResult[1][2].wordName;
      });
      const arr4 = arr3.filter((item) => {
        return item.wordName !== this.state.wordResult[2][2].wordName;
      });
      const arr5 = arr4.filter((item) => {
        return item.wordName !== this.state.wordResult[3][2].wordName;
      });
      const arr6 = arr5.filter((item) => {
        return item.wordName !== this.state.wordResult[4][2].wordName;
      });
      this.setState({
        allWords: [arr1, arr2, arr3, arr4, arr5, arr6]
      });
      logger.log("wordResult", this.state.wordResult);
    });
  }

  render() {
    return (
      <div styleName="container">
        <ShanDian />
        <Card allWords={this.state.allWords[0]} wordResult={this.state.wordResult[0]} card_container="card_container1" ref={(dom) => this.card1 = dom} />
        <Card allWords={this.state.allWords[1]} wordResult={this.state.wordResult[1]} card_container="card_container2" ref={(dom) => this.card2 = dom} />
        <Card allWords={this.state.allWords[2]} wordResult={this.state.wordResult[2]} card_container="card_container3" ref={(dom) => this.card3 = dom} />
        <Card allWords={this.state.allWords[3]} wordResult={this.state.wordResult[3]} card_container="card_container4" ref={(dom) => this.card4 = dom} />
        <Card allWords={this.state.allWords[4]} wordResult={this.state.wordResult[4]} card_container="card_container5" ref={(dom) => this.card5 = dom} />
        <Card allWords={this.state.allWords[5]} wordResult={this.state.wordResult[5]} card_container="card_container6" ref={(dom) => this.card6 = dom} />
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
