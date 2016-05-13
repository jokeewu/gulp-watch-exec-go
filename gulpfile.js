var gulp = require('gulp');
var run = require('gulp-run');

var cwd = process.cwd();
var dirs = cwd.split('/');
var projectDir = dirs[dirs.length - 1];
var runCMD = './' + projectDir;

gulp.task('default', ['run'], function() {
    // 监测go源文件变化
    gulp.watch('**/*.go', function() {
        gulp.run('restart');
    });
});

// 编译
gulp.task('compile', function() {
    return run('go build').exec();
});

gulp.task('run', function() {
    return run(runCMD).exec();
});

// 编译/运行
gulp.task('restart', ['compile'], function() {
    gulp.run('run');
});