var app 	 = require('../../app')
var gulp   = require('gulp')
var insert = require('gulp-insert')
var rename = require('gulp-rename')

//move pages
gulp.task('html', function() {
  return gulp.src('source/*.html')
    .pipe(rename(function (path) {
      path.basename = app.name + "-" + path.basename;
    }))
    .pipe(insert.prepend('<!-- '+app.origin+' -->\n'))
    .pipe(gulp.dest('qb-pages/'));
});