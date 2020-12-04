const gulp = require("gulp");

const scss = require("./tasks/scss");
const script = require("./tasks/script");
const html = require("./tasks/html");
const imagemin = require("./tasks/imagemin");
const svgSprite = require("./tasks/svgSprite");
const clean = require("./tasks/clean");
const serve = require("./tasks/serve");
const fonts = require("./tasks/fonts");
const lighthouse = require("./tasks/lighthouse");

const setMode = (isProduction = false) => (cb) => {
  process.env.NODE_ENV = isProduction ? "production" : "development";
  cb();
};

const dev = gulp.parallel(html, scss, script, fonts, imagemin, svgSprite);
const build = gulp.series(clean, dev);

module.exports.start = gulp.series(setMode(), build, serve);
module.exports.build = gulp.series(setMode(true), build);

module.exports.lighthouse = gulp.series(lighthouse);
