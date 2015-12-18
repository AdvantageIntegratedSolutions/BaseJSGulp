var app 	 = require('../../app')
var gulp   = require(app.node_path + 'gulp')
var insert = require(app.node_path + 'gulp-insert')
var rename = require(app.node_path + 'gulp-rename')

//move pages
gulp.task('html', function() {
  return gulp.src('src/html/**/*')
    .pipe(rename(function (path) {
      path.basename = app.name + "-" + path.basename;
    }))
    .pipe(insert.prepend('<!-- '+app.origin+' -->\n'))
    .pipe(gulp.dest('qb-pages/'));
});