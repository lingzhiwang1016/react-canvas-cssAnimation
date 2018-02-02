import React from "react";
import { connect } from "dva";
import CSSModules from "react-css-modules";
import { List, InputItem, Toast, Button, Flex, ImagePicker, WhiteSpace } from "antd-mobile";
import { createForm } from 'rc-form';
import PropTypes from "prop-types";
import queryString from "query-string";

import { smsCode } from "@/services/auth";
import logger from "@/utils/logger";
import alioss from "@/utils/alioss";

import styles from "./index.css";

@CSSModules(styles)
class Index extends React.Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(props.location.search);
    this.wxToken = parsed.code;
    logger.log("login wechatState", this.wechatCode);

    this.state = {
      files: []
    };
  }

  onImagesChange = (files, type, index) => {
    logger.log("file change", files, type, index);
    this.setState({
      files
    });
  }

  onGetSmsCode = () => {
    const phone = this.props.form.getFieldValue("telephone");
    smsCode(phone, "sign_in").then(res => {
      logger.log("smsCode res", res);
    }).catch(err => {
      Toast.info(err.message);
      logger.log("smsCode err", err);
    });
  };

  onSubmit = () => {
    this.props.form.validateFields(async (error, value) => {
      logger.log("validate", error, value);
      if (!error) {
        // 报名提交
        const avatar = await this.uploadImg();
        logger.log("avatar", avatar);
        this.props.dispatch({
          type: "auth/signUp",
          payload: {
            avatar: avatar,
            wxToken: this.wxToken,
            ...value,
          }
        }).then(res => {
          logger.log("signUp res", res);
        }).catch(err => {
          logger.warn("signUp err", err);
          Toast.info(err.message);
        });
      }
    });
  }

  uploadImg = async () => {
    const { files } = this.state;
    if (files.length > 0 && files[0].file) {
      const res = await alioss.putObject(files[0].file);
      return res.url;
    } else {
      return files.length > 0 ? files[0].url : "";
    }
  }

  renderOldForm() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { files } = this.state;
    logger.log("name", getFieldProps('name', {
      validateTrigger: "onBlur",
      rules: [{ required: true, message: "请填入姓名" }]
    }));
    return (
      <div>
        <List renderHeader={() => "年会报名"}>
          <InputItem
            {
              ...getFieldProps('name', {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: "请填入姓名" }]
              })
            }
            onErrorClick={() => {
              const err = getFieldError("name");
              if (err) {
                Toast.info(err);
              }
            }}
            error={getFieldError("name")}
            placeholder="姓名"
          >
            姓名
          </InputItem>

          <Flex>
            <Flex.Item>
              <InputItem
                {
                  ...getFieldProps('telephone', {
                    validateTrigger: "onBlur",
                    rules: [{ required: true, message: "请填入手机号" }]
                  })
                }
                onErrorClick={() => {
                  const err = getFieldError("telephone");
                  if (err) {
                    Toast.info(err);
                  }
                }}
                error={getFieldError("telephone")}
                placeholder="手机号"
              >
                手机号
              </InputItem>
            </Flex.Item>

            <Button type="primary" size="small" inline onClick={this.onGetSmsCode}>获取验证码</Button>

          </Flex>

          <InputItem
            {
              ...getFieldProps('smsCode', {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: "请填入验证码" }]
              })
            }
            onErrorClick={() => {
              const err = getFieldError("smsCode");
              if (err) {
                Toast.info(err);
              }
            }}
            error={getFieldError("smsCode")}
            placeholder="验证码"
          >
            验证码
          </InputItem>

          <List.Item>
            <ImagePicker
              files={files}
              onChange={this.onImagesChange}
              onImageClick={(index, fs) => logger.log("imageClick", index, fs)}
              selectable={files.length < 1}
              multiple={false}
            />
          </List.Item>

          <WhiteSpace/>

          <Button type="primary" onClick={this.onSubmit}>报名</Button>

        </List>
      </div>
    );
  }

  render() {
    return (
      <div className="bg">
        {this.renderOldForm()}
      </div>
    );
  }
}

Index.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default connect()(createForm()(Index));
