/*eslint no-console: 0 */

const utils = require("./utils");
const oss = require("./alioss");
const appConfig = require("./app.config");

console.log("start to upload static...\n");
const statics = utils.readFilesSync(utils.resolve("build"), ["html", "tgz"]);

oss.uploadFilesSync(statics, appConfig.config.cndPrefix).then((values) => {
    console.log("✔ upload to OSS complete!\n");
}).catch(ossErr => {
    console.log("✔ upload to OSS err!\n", ossErr);
});

