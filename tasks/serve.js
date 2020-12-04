const gulp = require("gulp");

const imageMinify = require("./imagemin");
const svgSprite = require("./svgSprite");
const styles = require("./scss");
const html = require("./html");
const script = require("./script");

const server = require("browser-sync").create();

function readyReload(cb) {
  server.reload();
  cb();
}

module.exports = function serve(cb) {
  server.init({
    server: "dist",
    notify: false,
    open: true,
    cors: true,
  });

  gulp.watch(
    "src/images/*.{gif,png,jpg,svg,webp}",
    gulp.series(imageMinify, readyReload)
  );
  gulp.watch("src/images/sprite/*.svg", gulp.series(svgSprite, readyReload));
  gulp.watch(
    "src/**/*.scss",
    gulp.series(styles, (cb) =>
      gulp.src("dist/css").pipe(server.stream()).on("end", cb)
    )
  );
  gulp.watch("src/**/*.js", gulp.series(script, readyReload));
  gulp.watch("src/**/*.html", gulp.series(html, readyReload));

  return cb();
};
