//configure tasks to run on all file changes
gulp.task('watch', function() {
  gulp.watch(['app.json', 'gulpfile.js', 'packages.json', 'README', '.gitignore'], adminTasks);
  gulp.watch('source/**/*', bundleTasks);
});
