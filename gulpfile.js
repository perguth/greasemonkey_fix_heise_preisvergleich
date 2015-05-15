var gulp = require('gulp')
var gutil = require('gulp-util')
var fs = require('fs')
var browserify = require('browserify')
var babelify = require('babelify')
var through = require('through2')
var prepend = require('prependify')

gulp.task('default', function () {
  // place code for your default task here
})
gulp.task('watch', function () {
  var pathGMConf = 'greasemonkey.conf'
  var getGMConf = function () {
    return fs.readFileSync(pathGMConf, {'encoding': 'UTF-8'})
  }
  var build = function (dest) {
    gutil.log('Building...')
    var b = browserify({ debug: true })
    b
      .transform(babelify)
      .require('./index.js', { entry: true })
      .plugin(prepend, getGMConf())
      .bundle()
      .on('error', function (err) { gutil.log('Error: ' + err.message) })
      .pipe(fs.createWriteStream(dest))
  }
  gulp.watch(['index.js', 'greasemonkey.conf', 'js/**/*.js'], function (event) { 
    build('fix_heise_preisvergleich.user.js')
  })
  build('fix_heise_preisvergleich.user.js')
})
