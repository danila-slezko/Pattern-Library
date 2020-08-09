var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvariables = require('postcss-css-variables');
var calc = require('postcss-calc');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var watch = require('gulp-watch');

// js file paths
var utilJsPath = 'node_modules/codyhouse-framework/main/assets/js'; // util.js path
var componentsJsPath = 'src/public/assets/js/components/*.js'; // component js files
var scriptsJsPath = 'src/public/assets/js'; // folder for final scripts

// css file paths
var cssFolder = 'src/public/assets/css'; // folder for final styles files
var scssFilesPath = 'src/public/assets/css/**/*.scss'; // scss files to watch

// html file paths
var htmlFolder = 'src/public/mockups'; // folder for final html files
var pugFilesPath = 'src/public/templates/clients/**/*.pug'; // pug files to watch

function reload(done) {
  browserSync.reload();
  done();
}

// Pages
gulp.task('pug', function () {
  return gulp
    .src(pugFilesPath)
    .pipe(
      pug({
        doctype: 'html',
        pretty: true
      })
    )
    .pipe(gulp.dest(htmlFolder));
});

gulp.task('process', function () {
  return watch(pugFilesPath, {ignoreInitial: false}).pipe(gulp.dest('pug'));
});

// Styles
gulp.task('sass', function () {
  return gulp
    .src(scssFilesPath)
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(cssFolder))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
    .pipe(rename('style-fallback.css'))
    .pipe(postcss([cssvariables(), calc()]))
    .pipe(gulp.dest(cssFolder));
});

// Scripts
gulp.task('scripts', function () {
  return gulp
    .src([utilJsPath + '/util.js', componentsJsPath])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(scriptsJsPath))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(scriptsJsPath))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Server
// gulp.task(
//   'browserSync',
//   gulp.series(function (done) {
//     browserSync.init({
//       server: {
//         baseDir: 'src/public'
//       },
//       notify: false
//     });
//     done();
//   })
// );

// Watch // removed 'browserSync',
gulp.task(
  'watch',
  gulp.series(['pug', 'sass', 'scripts'], function () {
    // gulp.watch('src/public/*.html', gulp.series(reload));
    gulp.watch('src/public/assets/css/**/*.scss', gulp.series(['sass']));
    gulp.watch('src/public/templates/**/*.pug', gulp.series(['pug']));
    gulp.watch(componentsJsPath, gulp.series(['scripts']));
  })
);
