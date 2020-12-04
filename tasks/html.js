const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rigger = require("gulp-rigger");
const browserSync = require("browser-sync").create();

module.exports = function html() {
  return gulp
    .src("src/*.html")
    .pipe(plumber())
    .pipe(rigger())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
};
