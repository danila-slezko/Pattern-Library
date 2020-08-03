/** @format */

var gulp = require("gulp");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssvariables = require("postcss-css-variables");
var calc = require("postcss-calc");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pug = require("gulp-pug");
var watch = require("gulp-watch");

// js file paths
var utilJsPath = "node_modules/codyhouse-framework/main/assets/js"; // util.js path - you may need to update this if including the framework as external node module
var componentsJsPath = "dev/assets/js/components/*.js"; // component js files
var scriptsJsPath = "dev/assets/js"; //folder for final scripts.js/scripts.min.js files

// css file paths
var cssFolder = "dev/assets/css"; // folder for final style.css/style-custom-prop-fallbac.css files
var scssFilesPath = "dev/assets/css/**/*.scss"; // scss files to watch

// html file paths
var htmlFolder = "dev/"; // folder for final style.css/style-custom-prop-fallbac.css files
var pugFilesPath = "dev/templates/clients/**/*.pug"; // scss files to watch

function reload(done) {
  browserSync.reload();
  done();
}

// Pages
gulp.task("pug", function () {
  return gulp
    .src(pugFilesPath)
    .pipe(
      pug({
        doctype: "html",
        pretty: true,
      })
    )
    .pipe(gulp.dest(htmlFolder));
});

gulp.task("process", function () {
  return watch(pugFilesPath, { ignoreInitial: false }).pipe(gulp.dest("pug"));
});

// Styles
gulp.task("sass", function () {
  return gulp
    .src(scssFilesPath)
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(cssFolder))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    )
    .pipe(rename("style-fallback.css"))
    .pipe(postcss([cssvariables(), calc()]))
    .pipe(gulp.dest(cssFolder));
});

// Scripts
gulp.task("scripts", function () {
  return gulp
    .src([utilJsPath + "/util.js", componentsJsPath])
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest(scriptsJsPath))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    )
    .pipe(rename("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(scriptsJsPath))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// Server
gulp.task(
  "browserSync",
  gulp.series(function (done) {
    browserSync.init({
      server: {
        baseDir: "dev",
      },
      notify: false,
    });
    done();
  })
);

// Watch
gulp.task(
  "watch",
  gulp.series(["browserSync", "pug", "sass", "scripts"], function () {
    gulp.watch("dev/*.html", gulp.series(reload));
    gulp.watch("dev/assets/css/**/*.scss", gulp.series(["sass"]));
    gulp.watch("dev/templates/**/*.pug", gulp.series(["pug"]));
    gulp.watch(componentsJsPath, gulp.series(["scripts"]));
  })
);
