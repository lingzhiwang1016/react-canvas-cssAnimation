const isDebugging = process.env.REACT_APP_PACK_ENV === "local" || process.env.REACT_APP_PACK_ENV === "development" || process.env.REACT_APP_PACK_ENV === "alpha";
const isTest = process.env.REACT_APP_PACK_ENV === "testing" && false;
const isDebuggingInChrome = true; // /Chrome/g.test(window.navigator.userAgent);

const colors = {
  log: "inherit",
  info: "inherit",
  warn: "#f0ad4e",
  error: "#d9534f",
};
/* eslint no-console: 0 */
export default {
  log: (message, ...args) => {
    if (isTest || !isDebuggingInChrome) {
      console.log(message, args);
      return;
    }
    if (!isDebugging || !message) return false;
    if (args && args.length > 0) {
      console.groupCollapsed(`%c ${(new Date()).toISOString()} ${message}`, `font-weight: bold; color: ${colors.log}`);
      args.forEach((arg) => {
        console.log(arg);
      });
      console.groupEnd();
    } else {
      console.log(`%c ${message}`, `font-weight: bold; color: ${colors.log}`);
    }
  },

  info: (message, ...args) => {
    if (isTest || !isDebuggingInChrome) {
      console.log(message, args);
      return;
    }
    if (!isDebugging || !message) return false;
    if (args && args.length > 0) {
      console.groupCollapsed(`%c ${(new Date()).toISOString()} ${message}`, `font-weight: bold; color: ${colors.info}`);
      args.forEach((arg) => {
        console.log(arg);
      });
      console.groupEnd();
    } else {
      console.log(`%c ${message}`, `font-weight: bold; color: ${colors.info}`);
    }
  },

  warn: (message, ...args) => {
    if (isTest || !isDebuggingInChrome) {
      console.log(message, args);
      return;
    }
    if (!isDebugging || !message) return false;
    if (args && args.length > 0) {
      console.groupCollapsed(`%c ${(new Date()).toISOString()} ${message}`, `font-weight: bold; color: ${colors.warn}`);
      args.forEach((arg) => {
        console.warn(arg);
      });
      console.groupEnd();
    } else {
      console.log(`%c ${message}`, `font-weight: bold; color: ${colors.warn}`);
    }
  },

  error: (message, ...args) => {
    if (isTest || !isDebuggingInChrome) {
      console.log(message, args);
      return;
    }
    if (!isDebugging || !message) return false;
    if (args && args.length > 0) {
      console.groupCollapsed(`%c ${(new Date()).toISOString()} ${message}`, `font-weight: bold; color: ${colors.error}`);
      args.forEach((arg) => {
        console.error(arg);
      });
      console.groupEnd();
      if (isDebugging) {
        if (typeof message === "object") {
          throw message;
        }
        args.forEach((arg) => {
          if (typeof arg === "object") {
            throw arg;
          }
        });
      }
    } else {
      console.error(`%c ${message}`, `font-weight: bold; color: ${colors.error}`);
      if (isDebugging) {
        if (typeof message === "object") {
          throw message;
        }
      }
    }
  },
};
