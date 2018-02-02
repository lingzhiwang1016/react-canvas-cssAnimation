const baseCdnPrefix = "annual-wx";
const cdnPath = "cdn-vk-html";
const oss = {
  region: "oss-cn-shenzhen",
  bucket: "vk-html",
  accessKeyId: "LTAIzhXQUPznwfoX",
  accessKeySecret: "YhfCxtRTgfPjTbYd4X2OI6J7gR8m78"
};

module.exports = {
  defaultConfig: {
    oss: oss
  },
  development: {
    assetsPublicPath: "/",
    cndPrefix: `${baseCdnPrefix}-dev`
  },
  alpha: {
    assetsPublicPath: `http://${cdnPath}.maysatech.com/${baseCdnPrefix}-alpha/`,
    cndPrefix: `${baseCdnPrefix}-alpha`
  },
  beta: {
    assetsPublicPath: `http://${cdnPath}.maysatech.com/${baseCdnPrefix}-beta/`,
    cndPrefix: `${baseCdnPrefix}-beta`
  },
  production: {
    assetsPublicPath: `http://${cdnPath}.maysatech.com/${baseCdnPrefix}-pro/`,
    cndPrefix: `${baseCdnPrefix}-pro`
  }
};

module.exports.config = Object.assign(module.exports.defaultConfig, module.exports[process.env.REACT_APP_PACK_ENV || "development"]);
