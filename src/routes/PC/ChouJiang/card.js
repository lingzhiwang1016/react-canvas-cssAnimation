import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import logger from "@/utils/logger";
import PropTypes from 'prop-types';

import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  static defaultProps = {
    allWords: [],
    wordResult: [],
    card_container: ""
  }
  constructor(props) {
    super(props);
    this.state = {
      allWords: [],
      wordResult: [],
      card_container: "",

      imgShow: "block",
      ulShow: "none",
      top: 0,
      scrollShow: "block",
      resultShow: "none",

      imgSrc: null
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      allWords: nextProps.allWords,
      wordResult: nextProps.wordResult,
      card_container: nextProps.card_container
    });
    this.cardType(nextProps.card_container);
  }

  cardType(card_container) {
    if (card_container === "card_container1") {
      this.setState({
        imgSrc: require("./img/万.png")
      });
    } else if (card_container === "card_container2") {
      this.setState({
        imgSrc: require("./img/科.png")
      });
    } else if (card_container === "card_container3") {
      this.setState({
        imgSrc: require("./img/春.png")
      });
    } else if (card_container === "card_container4") {
      this.setState({
        imgSrc: require("./img/节.png")
      });
    } else if (card_container === "card_container5") {
      this.setState({
        imgSrc: require("./img/晚.png")
      });
    } else if (card_container === "card_container6") {
      this.setState({
        imgSrc: require("./img/会.png")
      });
    } else {
      logger.log("父级传的card_container有问题");
    }
  }
  startScroll() {
    this.setState({
      imgShow: "none",
      ulShow: "flex",
      scrollShow: "block",
      resultShow: "none"
    });
    this.clearTimer = setInterval(() => {
      if (this.state.top >= -485) {
        this.setState({
          top: this.state.top - 6
        });
      } else {
        this.setState({
          top: 0
        });
      }
    }, 10);
  }
  stopScroll() {
    window.clearInterval(this.clearTimer);
    this.setState({
      scrollShow: "none",
      resultShow: "block"
    });
  }

  render() {
    return (
      <div styleName={this.state.card_container}>
        <img style={{ display: this.state.imgShow }} src={this.state.imgSrc} alt="" />

        <div styleName="card_wordNames" style={{ display: this.state.ulShow }}>
          <ul styleName="card_ul" style={{ top: this.state.top + "%", display: this.state.scrollShow }}>
            {this.state.allWords.map(item => {
              return (
                <li key={item.id}>{item.wordName}</li>
              );
            })}
          </ul>

          <ul styleName="card_ul_result" style={{ display: this.state.resultShow }}>
            {this.state.wordResult.map((item, index) => {
              if (index === parseInt(this.state.wordResult.length / 2)) {
                return <li key={index} styleName="result_li">{item.wordName}</li>;
              } else {
                return (
                  <li key={index}>{item.wordName}</li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  allWords: PropTypes.array,
  card_container: PropTypes.string,
  wordResult: PropTypes.array
};

export default Index;
