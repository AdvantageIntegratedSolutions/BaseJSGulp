var app 	     = require('../../app')
var gulp       = require(process.env.BASE_JS_NODE_PATH + 'gulp')
var sass       = require(process.env.BASE_JS_NODE_PATH + 'gulp-sass')
var concat     = require(process.env.BASE_JS_NODE_PATH + 'gulp-concat')
var insert     = require(process.env.BASE_JS_NODE_PATH + 'gulp-insert')

//compile scss
gulp.task('css', function() {
  return gulp.src('src/stylesheets/**/*')
    .pipe(sass())
    .pipe(concat(app.name + '-'+app.cssBundlePrefix+'.css'))
    .pipe(insert.prepend('/*'+app.origin+'*/\n'))
    .pipe(gulp.dest('qb-pages/'));
});