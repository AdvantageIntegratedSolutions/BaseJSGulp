var app 	     = require('../../app')
var gulp       = require(app.node_path + 'gulp')
var sass       = require(app.node_path + 'gulp-sass')
var concat     = require(app.node_path + 'gulp-concat')
var insert     = require(app.node_path + 'gulp-insert')

//compile scss
gulp.task('css', function() {
  return gulp.src('src/stylesheets/**/*')
    .pipe(sass())
    .pipe(concat(app.name + '-'+app.cssBundlePrefix+'.css'))
    .pipe(insert.prepend('/*'+app.origin+'*/\n'))
    .pipe(gulp.dest('qb-pages/'));
});