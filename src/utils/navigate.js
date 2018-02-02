import request from "@/utils/request";
import logger from "@/utils/logger";
import wx from "wx";

const navigatingUrl = "http://uri.amap.com/navigation/";
const navigatingKey = "0a2ba157a2874bd41064a40c0f05eeea";

/**
 *
 * @param pos {name: "创想公社", longitude: 118.176152, latitude: 24.481904}
 */
export default (pos) => {
  logger.log("navigate", pos);
  const url = `${navigatingUrl}?to=${pos.longitude},${pos.latitude},${pos.name}&mode=ride&callnative=1&key=${navigatingKey}`;
  /**
   * 12 刚好厦门岛
   * 14 半个岛
   * 18 刚好附近
   */
  if (wx.isReady) {
    logger.log("openLocation");
    wx.openLocation({
      latitude: pos.latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude: pos.longitude, // 经度，浮点数，范围为180 ~ -180。
      name: pos.name, // 位置名
      address: "", // 地址详情说明
      scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: url // 在查看位置界面底部显示的超链接,可点击跳转
    });
  } else {
    window.location.href = url;
  }
};
