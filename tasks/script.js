const gulp = require("gulp");
const plumber = require("gulp-plumber");
const webpackStream = require("webpack-stream");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const browserSync = require("browser-sync").create();
const uglify = require('gulp-uglify');

module.exports = function script() {
  return gulp
    .src("src/js/App.js")
    .pipe(plumber())
    .pipe(
      webpackStream({
        mode: process.env.NODE_ENV,
        output: {
          filename: "bundle.min.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                   ["@babel/preset-env",
                     {
                       "useBuiltIns": "usage", // alternative mode: "entry"
                       "corejs": 3, // default would be 2
                       "targets": "> 0.25%, not dead"
                       // set your own target environment here (see Browserslist)
                     }]
                  ],
                },
              },
            },
          ],
        },
        plugins: [
          new CircularDependencyPlugin(),
          new DuplicatePackageCheckerPlugin(),
        ],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
};
