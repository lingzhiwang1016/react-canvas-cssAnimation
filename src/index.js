import dva from "dva";
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from "history/createBrowserHistory";
import logger from "@/utils/logger";
import weixin from "@/utils/weixin";

import "./index.css";
import "./utils/ydui.flexible";

const history = createHistory();
// 1. Initialize
const app = dva({
  history: history,
  onError(e) {
    logger.warn("app err", e);
  },
  onAction: require("redux-logger").default
});

// 2. Plugins
// app.use(require("dva-loading")());
// 3. Model
app.model(require("./models/auth").default);
// 4. Router
app.router(require("./router").default);

dva.app = app;
window.app = app;
logger.log("start finished");

// 5. Start
const RootComponent = app.start();
const render = () => {
  ReactDOM.render(React.createElement(RootComponent), document.getElementById('root'));
};
// 热加载
app._plugin.apply('onHmr')(() => {
  logger.log("onHmr");
  render();
});

// 初始化
Promise.all([
  app._store.dispatch({ type: "auth/init" }),
  weixin(),
]).then(res => {
  logger.log("auth/init res", res);
  render();
}).catch(err => {
  logger.warn("auth/init err", err);
  render();
});
