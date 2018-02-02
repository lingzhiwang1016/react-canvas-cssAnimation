// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: [
    'react-app',
    'airbnb'
  ],
  rules: {
    // common
    "import/extensions": ["error", "always", {
      "js": "never",
      "jsx": "never"
    }],
    "func-names": 0, // 使用具名函数
    "arrow-body-style": 0, // 箭头函数要求必须有函数体
    "import/extensions": 0, // 扩展名称
    "import/no-unresolved": 0, // 找不到路径
    "import/no-extraneous-dependencies": 0,
    "no-return-assign": 0, // 返回的结果中使用了等于
    "max-len": 0, // 一行不可过长
    "consistent-return": 0, // if语句的问题
    "arrow-body-style": 0,
    "no-useless-escape": 0, // 用不到的字符
    "prefer-destructuring": 0, // 建议使用结构赋值
    "comma-dangle": 0, // json的最后一个不要求必填

    "quotes": [0, "double"], // 双引号

    // warnning
    'no-debugger': 2,

    // 永久关闭
    "no-await-in-loop": 0,  // for循环中可以用await
    "jsx-a11y/anchor-is-valid": 0,
    "no-mixed-operators": 0, // 字符混用的检验要关闭
    "no-restricted-syntax": 0, // 语法检查不要太严格
    "no-unused-vars": 0, // 回调函数中进程有无用参数，所以这个规则不要打开为好
    "no-else-return": 0, // return之后可以接else
    "no-lonely-if": 0, // 一个if也可以使用
    "import/no-dynamic-require": 0, // require不要动态的
    "global-require": 0, // require要在头部
    "radix": 0, // 默认10进制
    "import/prefer-default-export": 0, // 不要限定export几个
    "no-continue": 0, // 允许使用continue
    "linebreak-style": 0,
    "promise/always-return": 0, // promise 必须返回值
    "promise/no-callback-in-promise": 0, // promise中不用调用callback
    "camelcase": 0, // 驼峰模式
    "no-restricted-globals": ["error", "fdescribe"], // js的全局函数
    "no-underscore-dangle": 0, // 下划线的变量
    "spaced-comment": 0, // 注释不做要求

    //react
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], // js文件也可以使用
    "react/jsx-tag-spacing": 0,
    "react/forbid-prop-types": 0, // 禁止props使用object
    "react/no-array-index-key": 0, // 不允许列表中的index做key
    "no-underscore-dangle": 0, // 不允许下划线变量
    "jsx-a11y/click-events-have-key-events": 0, // 残障人士的支持
    "jsx-a11y/no-static-element-interactions": 0, // 不强制使用role

    // 未来会陆续打开
    "no-unused-expressions": 0,
    "guard-for-in": 0, // for in 要对key类型判断
    "no-param-reassign": 0, // 参数重新赋值
    "no-plusplus": 0, // 暂时允许++
    "prefer-template": 0, // 字符串用模版，不要用相加
    "arrow-parens": 0, // 箭头函数的参数括号问题
    "object-shorthand": 0, // class 中的方法不要些function
    "class-methods-use-this": 0, // 没用this的方法要改为静态的
  }
}
