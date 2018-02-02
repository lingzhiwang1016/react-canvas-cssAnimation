import api from "@/conf/api.js";
import cache from "@/utils/cache.js";
import request from "@/utils/request.js";
import logger from "@/utils/logger.js";
import OSS from "OSS";
import { CacheKeys } from "@/conf/constants";

const BUCKET = "thenewwork";
const REGION = "oss-cn-shanghai";
const URL_PREFIX = "static-annual-wx/";

export default {
  client: {},

  init: async function () {
    let token = cache.cacheGet(CacheKeys.aliossToken);
    if (!token) {
      // use cache
      const res = await request(api.oss_token, {
        method: "post"
      });
      logger.log("init", res);
      token = res.data;
      cache.cacheSet(CacheKeys.aliossToken, token, 1800 * 1000);
    }
    const option = {
      accessKeyId: token.credentials.accessKeyId,
      accessKeySecret: token.credentials.accessKeySecret,
      stsToken: token.credentials.securityToken,
      bucket: BUCKET,
      region: REGION
    };
    this.client = new OSS.Wrapper(option);
  },

  getRandomFileName(len) {
    len = len || 32;
    const $chars = "abcdefhijkmnprstwxyz2345678";
    const maxPos = $chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },

  async putObject(file) {
    await this.init();
    const fileName = URL_PREFIX + this.getRandomFileName(2) + "/" + file.name;
    // http://thenewwork.oss-cn-shanghai.aliyuncs.com/vankely_wx_mp_merchant/kH3hbFysi5PW/1118256331.jpg
    return this.client.multipartUpload(fileName, file, {}).then((res) => {
      // 当图片过大时候，会自动分段上传
      if (res.url === undefined) {
        const url = res.res.requestUrls[0].split("?")[0];
        const obj = {
          name: res.name,
          url: url,
          source_name: file.name
        };
        return obj;
      }
      res.source_name = file.name;
      return res;
    }).catch((err) => {
      logger.log("oss putObject err:", err);
    });
  }
};
