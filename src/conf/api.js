import config from "@/conf/config";

export default {
  sysDict_getDictByType: `${config.api}/sysDict/getDictByType`, // 获取字典类型
  oss_token: `${config.api}/ali/v1/oss_token`, // 获得阿里云签名
  current_user: config.api + "/user/current_user", // 当前用户
  weixin_sign_up: config.api + "/user/sign_up", // 微信报名
  sign_in: config.api + "/user/sign_in", // 签到
  sign_in_not_limit: config.api + "/user/sign_in_not_limit", // test签到

  smscode: config.api + "/sms/send/:telephone/:type", // 手机验证码

  all_sign_up: config.api + "/user/all_sign_up", // 所有报名用户
  count_sign_up: config.api + "/user/count_sign_up", // 所有报名用户数目

  all_words: config.api + "/lottery_word/all_words", // 所有的中奖关键词
  lottery_word_result: config.api + "/lottery_word/result", // 开奖词语

  prize_info: config.api + "/prize/info", // 厦万春晚关键词 - add by luo
  prize_open: config.api + "/prize/open", // 厦万春晚关键词开奖 - add by luo
  sign_in_status: config.api + "/user/sign_in_status" // 签到状态 - add by luo
};
