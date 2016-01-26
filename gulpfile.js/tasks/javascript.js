var app 	     = require('../../app')
var gulp 			 = require('gulp')
var concat 		 = require('gulp-concat')
var uglify  	 = require('gulp-uglify')
var babel 		 = require('gulp-babel')
var react 		 = require('gulp-react')
var sourcemaps = require('gulp-sourcemaps')
var rename 		 = require('gulp-rename')
var insert 		 = require('gulp-insert')

//compile JS
gulp.task('js', function() {
  return gulp.src('src/javascript/**/*')
    .pipe(sourcemaps.init())
    .pipe(react())
    .on('error', function(err){ console.log(err.message) })
    .pipe(babel())
    .on('error', function(err){ console.log(err.message) })
    .pipe(concat(app.name + '-'+app.jsBundlePrefix+'.js'))
    .pipe(insert.prepend('//'+app.origin+'\n'))
    .pipe(gulp.dest('qb-pages/'));
});