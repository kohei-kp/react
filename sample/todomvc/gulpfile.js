var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var flowtype= require('gulp-flowtype');

gulp.task('serve', function (done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('build', function () {
  //gulp.src(['./src/**/*.jsx', './src/**.js'])
  //.pipe(flowtype({
  //  all: false,
  //  weak: false,
  //  killFlow: false,
  //  beep: true,
  //  abort: false
  //}));

  browserify(['./app.jsx'])
  .transform(babelify)
  .bundle()
  .on('error', function (err) {
    console.log(err.message);
    this.emit('end');
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build/'));
});

gulp.task('watch', ['serve'], function () {
  watch(['./app.jsx', 'src/**/*.jsx', 'src/**/*.js'], function () {
    gulp.start(['build']);
  });

  watch(['./*.html'], browserSync.reload); // html
  watch(['build/bundle.js'], browserSync.reload); // JavaScript
  watch(['./css/**.css'], browserSync.reload); // css
});

gulp.task('default', ['watch']);
