import fetch from "dva/fetch";
import config from "@/conf/config";
import cache from "@/utils/cache";
import { CacheKeys } from "@/conf/constants";

export function LogicError(message, code, data) {
  this.message = message;
  this.code = code;
  this.data = data;
  this.name = "LogicError";
}

LogicError.prototype = new Error();
LogicError.prototype.constructor = LogicError;
LogicError.prototype.toString = function () {
  return this.name + ":" + this.code + "=>" + this.message;
};

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 400) {
    return response;
  }
  throw new LogicError("response.statusText", "", response);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  options = { credentials: "include", mode: "cors", ...options };
  if (options.useToken) {
    const token = cache.cacheGet(CacheKeys.loginToken);
    options.headers = { ...options.headers, "X-Token": token };
  }
  if (typeof options.path === "object") {
    if (!url) {
      throw new LogicError("请求的地址不存在", "601", "");
    }
    for (const key in options.path) {
      const val = options.path[key];
      url = url.replace(":" + key, val);
    }
  }
  if (options.params) {
    const keys = Object.keys(options.params);
    for (let index = 0; index < keys.length; index += 1) {
      const val = options.params[keys[index]];
      if (typeof val === "string") {
        options.params[keys[index]] = val.trim();
      }
    }
    const query = Object.keys(options.params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(options.params[k]))
      .join('&');
    url = url + "?" + query;
  }
  if (options.data) {
    options.headers = { ...options.headers, Accept: 'application/json', 'Content-Type': 'application/json' };
    options.body = JSON.stringify(options.data);
  }
  // 对apizz的接口取消withCredentials
  if (options.url && options.url.startsWith(config.mock)) {
    options.credentials = "same-origin";
    options.mode = "same-origin";
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(res => {
      if (res.responseCode === "00") {
        return res;
      } else {
        throw new LogicError(res.responseMessage, res.responseCode, res);
      }
    });
}
