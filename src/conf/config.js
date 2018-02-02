const config = {
  base: {
    mock: "http://dsn.apizza.cc/mock/8b86683fadcdff68217e132842351fe9",
    json: "http://127.0.0.1",
    ws: "ws://service-d.maysatech.com/annual-api/ws/sign_in_wall"
  },
  testing: {
    api: "http://service-d.maysatech.com/annual-api",
  },
  local: {
    api: "http://service-d.maysatech.com/annual-api",
  },
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
  },
};

export default Object.assign(config.base, config[process.env.REACT_APP_PACK_ENV]);
