const config = {
  env: process.env.REACT_APP_PACK_ENV,
  json: "http://127.0.0.1:80",
  api: "http://service-d.maysatech.com/annual-api",
  ws: "ws://service-d.maysatech.com/annual-api/ws/sign_in_wall"
};

const envConfig = {
  development: {
    api: "http://service-d.maysatech.com/annual-api",
    ws: "ws://service-d.maysatech.com/annual-api/ws/sign_in_wall"
  },
  alpha: {
    api: "http://service-t.maysatech.com/annual-api",
    ws: "ws://service-t.maysatech.com/annual-api/ws/sign_in_wall"
  },
  beta: {
    api: "http://service-demo.maysatech.com/annual-api",
    ws: "ws://service-t.maysatech.com/annual-api/ws/sign_in_wall"
  },
  production: {
    api: "http://service-annual.maysatech.com/annual-api",
    ws: "ws://service-annual.maysatech.com/annual-api/ws/sign_in_wall"
  }
};

Object.assign(config, envConfig[config.env]);

const wxConfig = {
  // 微信的相关配置
  wxShareConfig: {
    title: "2018，遇见美好",
    desc: "厦门万科春节联欢晚会",
    link: "http://annual.maysatech.com",
    imgUrl: "http://cdn-vk-html.maysatech.com/annual-wx-alpha/share.jpg",
  },
  wxSignature: `${config.api}/wechat/jsapi/signature`,
  wxRedirectUrl: `${config.api}/wechat/redirect_url`, // 获得微信登录跳转链接
  wxTransToken: `${config.api}/user/wxToken`, // 获取微信token
  wxLogin: `${config.api}/user/login`, // 微信登录
  wxBind: ``, // 微信绑定
  // 跳转的域名
  getProxyOrigin() {
    const code = this.getPublicCode();
    const state = config.env;
    if (state === "development") {
      return `http://annual.maysatech.com`;
    } else if (state === "alpha") {
      return `http://annual.maysatech.com`;
    } else if (state === "beta") {
      return `http://annual.maysatech.com`;
    } else {
      return `http://annual.maysatech.com`;
    }
  },
  // 根据状态，proxy需要跳转的新域名
  getOrigin(state) {
    if (state === "production") {
      return "http://annual.maysatech.com";
    } else if (state === "alpha") {
      return "http://annual-t.maysatech.com";
    } else {
      return "http://annual-d.maysatech.com";
    }
  },
  getPublicCode() {
    return "maysa";
  },
};

Object.assign(config, wxConfig);

export default config;

