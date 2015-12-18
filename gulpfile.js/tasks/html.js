var app 	 = require('../../app')
var gulp   = require('BaseJSGulpModule/gulp')
var insert = require('BaseJSGulpModule/gulp-insert')
var rename = require('BaseJSGulpModule/gulp-rename')

//move pages
gulp.task('html', function() {
  return gulp.src('src/html/**/*')
    .pipe(rename(function (path) {
      path.basename = app.name + "-" + path.basename;
    }))
    .pipe(insert.prepend('<!-- '+app.origin+' -->\n'))
    .pipe(gulp.dest('qb-pages/'));
});