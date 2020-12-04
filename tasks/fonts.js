const gulp = require('gulp')

module.exports = function fonts() {
  return gulp.src("src/fonts/*.{eot,ttf,woff,woff2}")
    .pipe(gulp.dest("dist/fonts"))
}