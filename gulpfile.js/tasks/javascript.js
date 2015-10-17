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
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat(app.name + '-'+app.jsBundlePrefix+'.js'))
    .pipe(insert.prepend('//'+app.origin+'\n'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('qb-pages/'));
});