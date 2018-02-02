import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";

import logger from "@/utils/logger";
import Title from "@/components/Title";
import styles from "./index.css";

@CSSModules(styles)
class Programme extends React.Component {
  renderItem = (program, index) => {
    return (
      <li key={index + ""}>
        <div styleName="img-container" onClick={() => { this.props.onClick(index); }}>
          <img src={program.imgUrl} alt="节目单"/>
        </div>
        <p>
          <span>{program.name}</span><span>{program.department}</span>
        </p>
      </li>
    );
  };

  render() {
    const { programs } = this.props;
    return (
      <div>
        <Title img={require('@/img/title_nhjmd.png')} name="年会节目单"/>
        <ul styleName="programme">
          {
            programs.map((item, index) => this.renderItem(item, index))
          }
        </ul>
      </div>
    );
  }
}

Programme.propTypes = {
  onClick: PropTypes.func,
  programs: PropTypes.array.isRequired
};
Programme.defaultProps = {
  onClick: null
};

export default Programme;
