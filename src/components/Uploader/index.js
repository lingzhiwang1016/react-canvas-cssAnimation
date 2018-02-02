import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";
import titleImg from "@/img/title_yzwktxz.png";
import styles from "./index.css";

@CSSModules(styles)

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // getImg = evt => {
  //   const reader = new FileReader();
  //   const file = evt.target.files[0];
  //   // 判断文件是否是图片
  //   if (file && /image\/+/.test(file.type)) {
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const newImage = {
  //         url: reader.result,
  //         file: file
  //       };
  //       this.setState({ photo: reader.result });
  //       this.props.onChange(newImage);
  //     };
  //   }
  // }
  onUpLoadClick = () => {
    this.props.onClick();
  }
  render() {
    return (
      <div styleName="container">
        <div styleName="upload-container">
          <div styleName="upload" onClick={this.onUpLoadClick}>
            <div styleName="preview">
              {this.props.img && <img src={this.props.img} alt="avatar"/>}
            </div>
            {/*<input type="file" name="avatar" onChange={this.getImg}/>*/}
          </div>
        </div>
        <div styleName="font-upload">
          <p styleName="main-font">上传你的照片，一起遇见美好！</p>
          <p>照片必须是本人, 否则将无法参与抽奖哦~</p>
        </div>
      </div>
    );
  }
}

Uploader.propTypes = {
  onClick: PropTypes.func,
  img: PropTypes.string
};
Uploader.defaultProps = {
  onClick: null,
  img: null
};

export default Uploader;
