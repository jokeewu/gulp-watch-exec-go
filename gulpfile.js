var gulp = require('gulp');
var exec = require('child_process').exec;

// 获取默认执行命令
var cwd = process.cwd();
var dirs = cwd.split('/');
var projectDir = dirs[dirs.length - 1];

const RUN_CMD = './' + projectDir;
const INTERVAL = 4000;

// 通过监测文件变化编译／运行
gulp.task('default', ['run'], function() {
    // 监测go源文件变化
    gulp.watch('**/*.go', function() {
        gulp.run('restart');
    });
});

// 定时循环编译／运行
gulp.task('interval', ['run'], function() {
    setInterval(function() {
        gulp.run('restart');
    }, INTERVAL);
});

// 编译
gulp.task('compile', function(cb) {
    exec('go build', function(err, stdout,stderr) {
        if(err) cb(err);
        cb();
    });
});

gulp.task('run', function(cb) {
    exec(RUN_CMD, function(err, stdout,stderr) {
        if(err) cb(err);
        console.log('==================[ Go Print]=================');
        console.log(stdout);
        console.log('==================[/Go Print]=================');
        cb();
    });
});

// 编译/运行
gulp.task('restart', ['compile'], function() {
    gulp.run('run');
});
