var app 	     = require('../../app')
var gulp 			 = require(app.node_path + 'gulp')
var concat 		 = require(app.node_path + 'gulp-concat')
var uglify  	 = require(app.node_path + 'gulp-uglify')
var babel 		 = require(app.node_path + 'gulp-babel')
var react 		 = require(app.node_path + 'gulp-react')
var sourcemaps = require(app.node_path + 'gulp-sourcemaps')
var rename 		 = require(app.node_path + 'gulp-rename')
var insert 		 = require(app.node_path + 'gulp-insert')

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