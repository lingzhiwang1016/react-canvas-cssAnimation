import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import { ActivityIndicator, Toast } from "antd-mobile";
import { createForm } from 'rc-form';
import PropTypes from "prop-types";
import queryString from "query-string";

import { smsCode } from "@/services/auth";
import logger from "@/utils/logger";
import alioss from "@/utils/alioss";
import wx from "wx";
import Timer from "@/ext/timer-decorator";
import weixin from "@/utils/weixin";

// 引入组件
import Title from "@/components/Title";
import Input from "@/components/Input";
import Slogan from "@/components/Slogan";
import Uploader from "@/components/Uploader";
import ButtonSign from "@/components/Button";
import Popup from "@/components/Popup";
import ButtonValidation from "@/components/ButtonValidation";

// 引入图片
import ImgTitleYZWKTXZ from "@/img/title_yzwktxz.png";
import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(props.location.search);
    this.wxToken = parsed.code;
    logger.log("login wechatState", this.wechatCode);

    this.state = {
      leftTime: 0,
      sendSms: false, //是否已经发送了短信
      file: {},
      processing: false,
      validateActive: true, // 发送验证码按钮是否可用
      noVankeNum: false,
      noPhoto: false,
      serverId: null,
      localimg: null
    };
    this.intervalId = null;
  }

  componentDidMount() {
    weixin().then(res => {
      logger.log("res", res);
    }).catch(err => {
      logger.warn("err", err);
    });
  }

  onImagesChange = (file) => {
    if (/image\/+/.test(file.file.type)) {
      logger.log("*****" + file.file.type);
      this.setState({
        file
      });
    }
  }

  onGetSmsCode = () => {
    //已经发送了短信
    if (this.state.sendSms) {
      return;
    }
    const phone = this.props.form.getFieldValue("telephone");
    const name = this.props.form.getFieldValue('name');
    // 判断姓名格式是否正确, 判断手机格式是否正确
    // if (!(/^[\u4e00-\u9fa5]{3,9}$|^[A-Za-z ]{6,17}$/.test(name))) {
    //   Toast.info('请输入您的真实姓名', 2);
    // } else
    if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(phone))) {
      Toast.info('请输入正确的手机号码', 2);
    } else {
      this.startCountdown();
      //设置为已发送短信
      this.setState({ sendSms: true });
      smsCode(phone, "sign_in").then(res => {
        logger.log("smsCode res", res);
      }).catch(err => {
        this.resetCountDown();
        Toast.info(err.message, 2);
        logger.log("smsCode err", err);
      });
    }
  };

  onSubmit = () => {
    this.props.form.validateFields((error, value) => {
      logger.log("validate", error, value);
      if (error) {
        const errs = error[Object.keys(error)[0]];
        const firstErr = errs.errors;
        logger.warn("errr", firstErr);
        Toast.info(firstErr[0].message, 2);
        return;
      }
      if (this.state.processing) {
        return;
      }
      this.setState({
        processing: true
      });
      this.submitInfo(value).then(res => {
        this.setState({
          processing: false
        });
      }).catch(err => {
        this.setState({
          processing: false
        });
      });
    });
  }
  onWxUpload = () => {
    const me = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // me.setState({
        //   localIds: res.localIds
        // });
        const localIds = res.localIds;
        //this.state.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        // logger.log("*****" + file.file.type);
        // this.setState({
        //   file
        // });
        const node = document.createElement("img");
        // node.src = localIds[0];
        me.setState({
          localimg: localIds[0]
        });
        // document.body.appendChild(node);
        wx.uploadImage({
          localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res1) {
            me.setState({
              serverId: res1.serverId
            });
            //this.serverId = res1.serverId; // 返回图片的服务器端ID
            logger.log("serverId", me.state.serverId);
          }
        });
        wx.getLocalImgData({
          localId: localIds[0], // 图片的localID
          success: function (res2) {
            // me.setState({
            //   localimg: res.localData
            // });
            //const localData = res2.localData; // localData是图片的base64数据，可以用img标签显示
          }
        });
      }
    });
  }
  submitInfo = async (info) => {
    logger.log("avatar1", this.state.serverId);
    const avatar = await this.uploadImg();
    logger.log("avatar", avatar);
    this.props.dispatch({
      type: "auth/signUp",
      payload: {
        avatar: avatar,
        mediaId: this.state.serverId,
        wxToken: this.wxToken,
        ...info,
      }
    }).then(res => {
      logger.log("signUp res", res);
    }).catch(err => {
      logger.warn("signUp err", err);
      if (err.code === 'B10007') {
        Toast.info('验证码输入错误', 2);
      } else if (err.code === 'B20003') {
        this.setState({
          noVankeNum: true
        });
      } else if (err.code === 'B30006') {
        this.setState({
          noPhoto: true
        });
      } else {
        Toast.info(err.message, 2);
      }
    });
  }

  /**
   * 倒计时
   */
  startCountdown = () => {
    logger.log("startCountdown");
    this.setState({
      leftTime: 60,
      validateActive: false
    });
    this.intervalId = this.props.setInterval(() => {
      this.setState({
        leftTime: this.state.leftTime - 1
      });
      if (this.state.leftTime <= 0) {
        this.resetCountDown();
      }
    }, 1000);
  }

  resetCountDown = () => {
    this.props.clearInterval(this.intervalId);
    this.setState({
      leftTime: 0,
      validateActive: true
    });
    //重置为短信未发送
    this.setState({ sendSms: false });
  }
  /**
   * 取消弹窗
   */
  popNoVankeNumClick = () => {
    this.setState({
      noVankeNum: false
    });
  }
  popNoPhotoClick = () => {
    this.setState({
      noPhoto: false
    });
  }
  uploadImg = async () => {
    const { file } = this.state;
    if (file.file) {
      const res = await alioss.putObject(file.file);
      return res.url;
    } else {
      return file.url;
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { files } = this.state;
    return (
      <div className="bg">
        <Popup visible={this.state.noVankeNum} onClick={this.popNoVankeNumClick}>
          <p>您的手机号判断为非厦门万科员工</p>
          <p>当前无法报名, 请确认填写的是您万科登记的手机号, 有问题请联系 ‭ 谢先艺 18659261158</p>
        </Popup>
        <Popup visible={this.state.noPhoto} onClick={this.popNoPhotoClick} btnText="上传照片">
          <p>您还未上传照片 没有照片无法参与年会抽奖活动</p>
          <span/>
        </Popup>
        <Slogan/>
        <Title img={ImgTitleYZWKTXZ} name="验证万科通行证"/>
        <form styleName="form-login">
          {
            // <div styleName="input-container">
            //   <Input
            //     {
            //       ...getFieldProps('name', {
            //         validateTrigger: "onBlur",
            //         rules: [{ required: true, message: "请填入姓名" }]
            //       })
            //     }
            //     onErrorClick={() => {
            //       const err = getFieldError("name");
            //       if (err) {
            //         Toast.info(err, 2);
            //       }
            //     }}
            //     error={getFieldError("name")}
            //     type="text"
            //     name="name"
            //     placeholder="请输入您的真实姓名"
            //   />
            // </div>
          }
          <div styleName="input-container">
            <Input
              {
                ...getFieldProps('telephone', {
                  validateTrigger: "onBlur",
                  rules: [{ required: true, message: "请填入手机号" }]
                })
              }
              onErrorClick={() => {
                const err = getFieldError("telephone");
                if (err) {
                  Toast.info(err, 2);
                }
              }}
              error={getFieldError("telephone")}
              type="number"
              name="phone"
              placeholder="请输入您的手机号码"
            />
          </div>
          <div styleName="input-container">
            <Input
              {
                ...getFieldProps('smsCode', {
                  validateTrigger: "onBlur",
                  rules: [{ required: true, message: "请填入验证码" }]
                })
              }
              onErrorClick={() => {
                const err = getFieldError("smsCode");
                if (err) {
                  Toast.info(err, 2);
                }
              }}
              error={getFieldError("smsCode")}
              type="text"
              name="validator"
              placeholder="请输入验证码"
            />
            <ButtonValidation active={this.state.validateActive} onClick={this.onGetSmsCode}> {this.state.leftTime <= 0 ? "发送验证码" : this.state.leftTime + " S"} </ButtonValidation>
          </div>
          <Uploader onChange={this.onImagesChange} onClick={this.onWxUpload} img={this.state.localimg}/>
          <div styleName="space-photo-bottom"/>
          <ButtonSign name="报名" onClick={this.onSubmit}/>
          <div styleName="bottomSection"/>
        </form>
        <ActivityIndicator toast animating={this.state.processing} text="正在报名中"/>
      </div>
    );
  }
}

Index.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  setInterval: PropTypes.func.isRequired,
  clearInterval: PropTypes.func.isRequired,
};

export default connect()(createForm()(Timer(Index)));
