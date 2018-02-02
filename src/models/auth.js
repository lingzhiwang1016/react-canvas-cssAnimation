import { routerRedux } from 'dva/router';

import logger from "@/utils/logger";
import { redirectWeiXin, currentUser, getToken, weixinLogin, signUp } from "@/services/auth";
import utils from "@/utils/utils";
import cache from "@/utils/cache";
import request from "@/utils/request";
import api from "@/conf/api";
import { CacheKeys } from "@/conf/constants";

export default {

  namespace: "auth",

  state: {
    // 临时的服务器微信token
    wxCode: {},
    // 登录信息
    isLogin: false,
    loginUser: {}
  },

  subscriptions: {
    setup({ dispatch, history }, onError) {
    },
  },

  effects: {
    // init
    * init({ payload }, { call, put }) {
      logger.log("init payload", payload);
      let data = {
        isLogin: false,
        loginUser: {}
      };
      try {
        data = {
          isLogin: cache.cacheGet(CacheKeys.isLogin) || false,
          loginUser: cache.cacheGet(CacheKeys.loginUser) || {}
        };
      } catch (err) {
        logger.warn("init", err);
      }
      try {
        if (data.isLogin) {
          const user = yield currentUser();
          logger.log("init user info", user.data);
          data.loginUser = user.data;
          cache.cacheSet(CacheKeys.isLogin, true, 24 * 3600 * 1000);
          cache.cacheSet(CacheKeys.loginUser, user.data, 24 * 3600 * 1000);
        }
      } catch (err) {
        logger.warn("init with net", err);
        cache.cacheRemove(CacheKeys.isLogin);
        cache.cacheRemove(CacheKeys.loginUser);
        data = {
          isLogin: false,
          loginUser: {}
        };
      }
      yield put({ type: "loginResult", payload: data });
      return "success";
    },

    // 跳转到登录页面，接收微信code
    * redirectLogin({ payload: originUrl }, { call, put }) {
      logger.log("redirectLogin originUrl", originUrl);
      cache.cacheSet(CacheKeys.redirectUrl, originUrl, 1 * 3600 * 1000);

      const state = process.env.REACT_APP_PACK_ENV;
      let signUpUrl = utils.getProxyOrigin() + "/login";
      if (state !== "production") {
        signUpUrl = utils.getProxyOrigin() + "/proxy_login";
      }
      const publicCode = utils.getPublicCode();
      const res = yield call(redirectWeiXin, signUpUrl, state, publicCode);
      window.location.replace(res.data);
      yield utils.sleep(2000);
      return "finish";
    },

    // 使用微信code尝试登录
    * wxLogin({ payload: wxCode }, { call, put }) {
      logger.log("wxLogin wxCode", wxCode);
      const publicCode = utils.getPublicCode();
      const res = yield call(getToken, wxCode, publicCode);
      logger.log("wxLogin wxCode res", res);
      yield put({ type: "wxCode", payload: { wxCode: res.data } });
      yield put({ type: "login", payload: { wxToken: res.data.tokenId } });
    },

    // 使用微信token尝试登录
    * login({ payload: { wxToken } }, { call, put }) {
      logger.log("login wxToken", wxToken);
      try {
        const res = yield weixinLogin(wxToken);
        logger.log("login res", res);
        cache.cacheSet(CacheKeys.isLogin, true, 24 * 3600 * 1000);
        cache.cacheSet(CacheKeys.loginUser, res.data, 24 * 3600 * 1000);
        cache.cacheSet(CacheKeys.loginToken, res.data.token.id, 24 * 3600 * 1000);
        yield put({ type: "loginResult", payload: { isLogin: true, loginUser: res.data } });

        let originUrl = cache.cacheGet(CacheKeys.redirectUrl);
        originUrl = !originUrl ? "/" : originUrl;
        yield put(routerRedux.replace(originUrl));
      } catch (err) {
        logger.warn("login err", err);
        if (err.code === "B20007") {
          // 报名
          yield put(routerRedux.replace("/signUp?code=" + wxToken));
        } else {
          yield put(routerRedux.replace("/error"));
        }
      } // catch end
    },

    // 报名
    * signUp({ payload }, { call, put }) {
      logger.log("signUp payload", payload);
      const res = yield call(signUp, payload);
      logger.log("login res", res);
      cache.cacheSet(CacheKeys.isLogin, true, 24 * 3600 * 1000);
      cache.cacheSet(CacheKeys.loginUser, res.data, 24 * 3600 * 1000);
      cache.cacheSet(CacheKeys.loginToken, res.data && res.data.token && res.data.token.id, 24 * 3600 * 1000);
      yield put({ type: "loginResult", payload: { isLogin: true, loginUser: res.data } });

      let originUrl = cache.cacheGet(CacheKeys.redirectUrl);
      originUrl = !originUrl ? "/" : originUrl;
      yield put(routerRedux.replace(originUrl));
    },

  },

  reducers: {
    wxCode(state, action) {
      return { ...state, ...action.payload };
    },
    loginResult(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
