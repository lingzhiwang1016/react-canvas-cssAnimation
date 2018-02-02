import moment from "moment";

export const patten = {
  // 英文字符
  eng: /^[a-zA-Z]{5,20}$/,
  // 邮箱
  email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  // 数字
  num: /^[0-9]{5,20}$/,
  // 浮点数
  float: /^[0-9]+[\.]{0,1}[0-9]*$/,
  // 英文字母和数字
  engnum: /^[a-zA-Z0-9]{5,20}$/,
  // 手机
  phone: /^[1][3|4|5|7|8][0-9]{9}$/,
  // 中文
  chinese: /^[\u4e00-\u9fa5]$/,
  // 密码
  password: /^[a-zA-Z][a-zA-Z0-9]{5,19}$/,
  password_back: /^[a-zA-Z]+(?=[0-9]+)$|^[0-9]+(?=[a-zA-Z]+)$/,
  // 特殊字符
  special: /[`~!@#\$%\^\&\*\(\)_\+<>\?:\"\{\},\.\\\/;'\[\]]+/,
  // 纳税人识别号18号
  idenfifyNumber: /[0-9a-zA-Z]{18}/,
};

const funcs = {
  // 跳转的域名
  getProxyOrigin() {
    const state = process.env.REACT_APP_PACK_ENV;
    if (state === "production") {
      return "http://annual.maysatech.com";
    } else if (state === "alpha") {
      return "http://annual.maysatech.com";
    } else {
      return "http://annual.maysatech.com";
    }
  },
  // 根据状态，proxy需要跳转的新域名
  getOrigin(state) {
    const code = this.getPublicCode();
    if (state === "production") {
      return "http://annual.maysatech.com";
    } else if (state === "alpha") {
      return "http://annual-t.maysatech.com";
    } else {
      return "http://annual-d.maysatech.com";
    }
  },
  getPublicCode() {
    if (process.env.REACT_APP_PACK_ENV === "production") {
      return "maysa";
    } else if (process.env.REACT_APP_PACK_ENV === "alpha") {
      return "maysa";
    } else {
      return "maysa";
    }
  },
  sleep(mills) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve();
      }, mills);
    });
  },
  isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  },
  getDefaultVal(val) {
    if (this.isArray(val)) {
      return val;
    }
    if (val === "" || val === null || val === undefined) {
      return "--";
    }
    return val;
  },
  getDefaultValByObj(obj) {
    for (const key in obj) {
      obj[key] = this.getDefaultVal(obj[key]);
    }
    return obj;
  },
  getDefaultValByList(list) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      list[i] = this.getDefaultValByObj(item);
    }
    return list;
  },
  patten(value, express = "eng") {
    switch (express) {
      case "eng":
        return this.pattenEng(value);
      case "email":
        return this.pattenEmail(value);
      case "num":
        return this.pattenNum(value);
      case "float":
        return this.pattenFloat(value);
      case "engNum":
        return this.pattenEngNum(value);
      case "phone":
        return this.pattenPhone(value);
      case "chinese":
        return this.pattenChinese(value);
      case "special":
        return this.pattenSpecial(value);
      default:
        return false;
    }
  },
  pattenEng(value) {
    return patten.eng.test(value);
  },
  pattenEmail(value) {
    return patten.email.test(value);
  },
  pattenNum(value) {
    return patten.num.test(value);
  },
  pattenFloat(value) {
    return patten.float.test(value);
  },
  pattenEngNum(value) {
    return patten.engnum.test(value);
  },
  pattenPhone(value) {
    return patten.phone.test(value);
  },
  pattenChinese(value) {
    return patten.chinese.test(value);
  },
  pattenPassword(p) {
    // console.log("value:", value)
    // if(patten.password.test(value)){
    //     return value.length <= 20 && value.length >= 6
    // }
    // return false
    if (p.length < 6) {
      return false;
    }
    if (p.length > 20) {
      return false;
    }
    if (p.search(/[a-zA-Z]/i) < 0) {
      return false;
    }
    if (p.search(/[0-9]/) < 0) {
      return false;
    }
    if (p.search(/[^0-9a-zA-Z]/) > -1) {
      return false;
    }
    return true;
  },
  pattenSpecial(value) {
    return patten.special.test(value);
  },

  getMonthDays(date) {
    const curDate = new Date(date);
    /* 将日期设置为1, 避免月份加一后，日期错乱 */
    curDate.setDate(1);
    const curMonth = curDate.getMonth();
    /*  月份加一 */
    curDate.setMonth(curMonth + 1);
    /* 将日期设置为0, 等于1号减一天，也就是这个月的最后一天 */
    curDate.setDate(0);
    /* 返回当月的天数 */
    return curDate.getDate();
  },

  getNextMonthDate(date, cycleMonth) {
    const nextStart = new Date(date);
    nextStart.setMonth(nextStart.getMonth() + cycleMonth);
    if (date.getDate() > 15 && nextStart.getDate() < 15) {
      nextStart.setDate(0);
    }
    return nextStart;
  },

  getLastDayOfYear(date) {
    const nextStart = new Date(date);
    nextStart.setMonth(11);
    nextStart.setDate(31);
    return nextStart;
  },

  formatterTime(row, column) {
    return funcs.formatDate(row[column.property], "YYYY-MM-DD HH:mm:ss");
  },
  formatterDate(row, column) {
    return funcs.formatDate(row[column.property], "YYYY-MM-DD");
  },

  formatDate(date, format) {
    if (!date) {
      return "";
    }
    if (!format) {
      format = "YYYY-MM-DD";
    }
    const formatStr = moment(date).format(format);
    return formatStr;
  },
  formatStringToDate(string) {
    return moment(string);
  },

  getWeekFromString(string) {
    const date = moment(string).weekday();
    switch (date) {
      case 0:
        return "周日";
      case 1:
        return "周一";
      case 2:
        return "周二";
      case 3:
        return "周三";
      case 4:
        return "周四";
      case 5:
        return "周五";
      case 6:
        return "周六";
      default:
        return "未知";
    }
  },
  // 保留两位小数
  formatFloat2(num) {
    const number = Number(num);
    if (number) {
      return number.toFixed(2);
    }
    return "0.00";
  },

  smallImage(url) {
    if (url == null) {
      return "";
    }
    // url = url.replace(/https:/g, "http:");
    url = url.replace(/oss-cn-/g, "img-cn-");
    if (url.indexOf("img-cn-") !== -1) {
      return `${url}@480w_1l`;
    }
    return url;
  },

  tableRowClassName(row, index) {
    if (index % 2 === 0) {
      return "white-row";
    } else if (index % 2 === 1) {
      return "black-row";
    }
  },

  validateNonZeroStr(rule, value, callback) {
    if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      return callback();
    }
    return callback(new Error(rule.message));
  },

  validateNumberStr(rule, value, callback) {
    // console.log("validateNumberStr:", rule.fullField, value, typeof value);
    let checkVal = true;
    if (!value && value !== 0) {
      if (rule.required) {
        checkVal = false;
      }
    } else if (typeof value === "string") {
      if (!(/^\d+(\.\d+)?$/.test(value))) {
        checkVal = false;
      }
    } else if (typeof value !== "number") {
      checkVal = false;
    }
    // console.log("validateNumberStr:", checkVal);
    if (checkVal) {
      return callback();
    }
    return callback(new Error(rule.message));
  },

  // 检测面积后者是否大于前者，出铺面积等
  validateArea(rule, value, callback) {
    if (parseFloat(value[0]) < parseFloat(value[1])) {
      return callback(new Error(rule.message));
    }
    return callback();
  },

  /**
   * 调整阿里云的图片大小
   * @param url
   * @param style [small 160, normal 480, large 960]
   * @returns {*}
   */
  aliossWithStyle(url, style = "normal") {
    if (!url) {
      return url;
    }
    return `${url}?x-oss-process=style/${style}`;
  }
};
export default funcs;
