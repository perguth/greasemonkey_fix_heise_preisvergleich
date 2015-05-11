var gulp = require('gulp')
var gutil = require('gulp-util')
var fs = require('fs')
var browserify = require('browserify')
var babelify = require('babelify')
var through = require('through2')

gulp.task('default', function () {
  // place code for your default task here
})
gulp.task('watch', function () {
  var pathGMConf = 'greasemonkey.conf'
  var getGMConfBuffer = function () {
    return fs.readFileSync(pathGMConf)
  }
  var build = function (dest) {
    gutil.log('Building...')
    var b = browserify({ debug: true })
    b
      .transform(babelify)
      .require('./index.js', { entry: true })
      .on('bundle', function () {
          // thanks: https://github.com/twada/licensify/blob/master/lib/licensify.js
          // why u not working?: https://www.npmjs.com/package/gulp-insert
          var first = true;
          b.pipeline.get('wrap').push(through.obj(function (buf, enc, next) {
              if (first) {
                  this.push(getGMConfBuffer());
                  first = false;
              }
              this.push(buf);
              next();
          }));
      })
      .bundle()
      .on('error', function (err) { gutil.log('Error: ' + err.message) })
      .pipe(fs.createWriteStream(dest))
  }
  gulp.watch(['index.js', 'greasemonkey.conf', 'js/**/*.js'], function (event) { 
    build('fix_heise_preisvergleich.user.js')
  })
  build('fix_heise_preisvergleich.user.js')
})
