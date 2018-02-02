/**
 * Created by lijinchao(joshua) on 2018/1/25.
 */
import request from "@/utils/request";
import logger from "@/utils/logger";
import wx from "wx";

const configWeiXin = () => {
  const title = "万科年会2017";
  const desc = "万科年会2017-大吉大利";
  const link = "http://annual.maysatech.com";
  const imgUrl = "http://cdn-vk-html.maysatech.com/annual-wx-pro/share.jpg";
  wx.error(err => {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    logger.log("微信err", err);
  });
  wx.ready(() => {
    logger.log("微信ready");
    wx.isReady = true;
    wx.onMenuShareTimeline({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        logger.log("wx share success");
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        logger.log("wx share cancel");
      }
    });

    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      type: "link", // 分享类型,music、video或link，不填默认为link
      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        logger.log("wx share success");
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        logger.log("wx share cancel");
      }
    });

    wx.onMenuShareQQ({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        logger.log("wx share success");
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        logger.log("wx share cancel");
      }
    });

    wx.onMenuShareWeibo({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        logger.log("wx share success");
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        logger.log("wx share cancel");
      }
    });

    wx.onMenuShareQZone({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        logger.log("wx share success");
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        logger.log("wx share cancel");
      }
    });
  });

  wx.error((err) => {
    logger.log("wx error", err);
  });
};

export default async (configUrl) => {
  let url = window.location.href.split("#")[0];
  if (configUrl) {
    url = configUrl;
  }
  url = encodeURI(url);
  const api = "http://service-demo.vkcommerce.com/vankely-mp-merchant-api/wechat/jsapi/signature";
  logger.log("wx config url", url);
  // alert(url);
  return request(api, {
    method: "get",
    params: {
      url,
      wechatCode: "maysa001"
    }
  }).then(res => {
    logger.log("微信config res", res);

    wx.config({
      debug: process.env.REACT_APP_PACK_ENV === "development", // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.appid, // 必填，企业微信的cropID
      timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.noncestr, // 必填，生成签名的随机串
      signature: res.data.signature, // 必填，签名，见附录1
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "openLocation", "chooseImage", "uploadImage", "getLocalImgData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    configWeiXin();
    return "success";
  }).catch(err => {
    logger.warn("config weixin err", err);
    return "fail";
  });
};
