const fs = require("fs");
const path = require("path");

/**
 * 返回绝对路径
 * @param  {String} dir 目录名
 * @return {String}     目录绝对地址
 */
exports.resolve = function(dir) {
    return path.join(__dirname, "..", dir);
};

/**
 * 同步遍历读取路径下的资源并以 {key: value} 形式输出
 * @param {String} entry 绝对路径地址
 * @param {Array} exclude 不需要遍历的资源
 * eg: /work/test-repo/src/view =>
 * {
 *     "/login/index.js": "/work/test-repo/src/view/login/index.js",
 *     "/login/index.css": "/work/test-repo/src/view/login/index.css",
 *     "/login/index.html": "/work/test-repo/src/view/login/index.html"
 * }
 */
exports.readFilesSync = function (entry, exclude = []) {
    const fileList = {};

    (function readFile (nextEntry) {
        const files = fs.readdirSync(nextEntry);

        files.forEach((item) => {
            const file = path.resolve(nextEntry, item);
            const stat = fs.lstatSync(file);
            const ext = path.extname(file).substring(1);

            if (stat.isDirectory()) {
                readFile(file);
                return;
            }

            if (!ext || exclude.indexOf(ext) >= 0) {
                return;
            }

            fileList[file.replace(entry, "")] = file;
        });
    })(entry);

    return fileList;
}
