import request, { LogicError } from "@/utils/request";
import api from "@/conf/api";
import config from "@/conf/config";

export const redirectWeiXin = (redirectUrl, state, publicCode) => {
  return request(config.wxRedirectUrl, {
    method: "get",
    params: {
      url: redirectUrl,
      state: state,
      publicCode: publicCode,
    }
  });
};

export const currentUser = () => {
  return request(api.current_user, {
    method: "get",
    useToken: true
  });
};

export const getToken = (authCode, publicCode) => {
  return request(config.wxTransToken, {
    method: "get",
    params: {
      authCode,
      publicCode
    }
  });
};

export const weixinLogin = (wxToken) => {
  return request(config.wxLogin, {
    method: "post",
    data: {
      wxToken
    }
  });
};

export const signUp = (payload) => {
  return request(api.weixin_sign_up, {
    method: "post",
    data: payload
  });
};

export const smsCode = async (telephone, type) => {
  if (!telephone) {
    throw new LogicError("请输入手机号");
  }
  return request(api.smscode, {
    method: "get",
    path: {
      telephone,
      type
    }
  });
};

// 中奖关键词
export const allWords = () => {
  return request(api.all_words, {
    method: "get"
  });
};
// 开奖词语
export const lottery_word_result = () => {
  return request(api.lottery_word_result, {
    method: "get"
  });
};

// 签到(使用token)
export const qiandao = () => {
  return request(api.sign_in, {
    method: "post",
    useToken: true
  });
};

// test签到(使用token)
export const testQiandao = (telephone) => {
  return request(api.sign_in_not_limit, {
    method: "post",
    useToken: true,
    params: {
      telephone
    }
  });
};

// 所有报名用户
export const allSignUp = (telephone) => {
  return request(api.all_sign_up, {
    method: "get",
  });
};

export const allSignUpCount = () => {
  return request(api.count_sign_up, {
    method: "get"
  });
};

// 厦万春晚关键词 - add by luo
export const prizeInfo = () => {
  return request(api.prize_info, {
    method: "get",
    useToken: true
  });
};

// 厦万春晚关键词 - add by luo
export const prizeOpen = () => {
  return request(api.prize_open, {
    method: "post",
    useToken: true
  });
};

export const qiandaoStatus = () => {
  return request(api.sign_in_status, {
    method: "get",
    useToken: true
  });
};
