const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");

module.exports = function scss() {
  return gulp
    .src(["src/scss/main.scss"])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(concat("bundle.css"))
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
};
