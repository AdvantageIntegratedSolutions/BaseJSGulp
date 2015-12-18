
var gulp = require(app.node_path + 'gulp')

//configure tasks to run on all file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*', ['deploy']);
});
