var app 	     = require('../../app')
var gulp 			 = require(app.path + 'gulp')

//configure tasks to run on all file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*', ['deploy']);
});
