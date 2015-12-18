var app 	     = require('../../app')
var gulp 			 = require(app.path + 'gulp')
var concat 		 = require(app.path + 'gulp-concat')
var uglify  	 = require(app.path + 'gulp-uglify')
var babel 		 = require(app.path + 'gulp-babel')
var react 		 = require(app.path + 'gulp-react')
var sourcemaps = require(app.path + 'gulp-sourcemaps')
var rename 		 = require(app.path + 'gulp-rename')
var insert 		 = require(app.path + 'gulp-insert')

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