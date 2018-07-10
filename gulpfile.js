var gulp = require('gulp');
var gls = require('gulp-live-server');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var publish = require('gulp-npm-publish');

gulp.task('default', function(callback) {
    runSequence('hint','test', 'run',
        callback
    );
});

gulp.task('publish', ['test'], function(){
    publish();
});

gulp.task('run', function(){
    var server = gls.new('server.js');
    gulp.watch('**/*', function() {
        gulp.start('test');
        gulp.start('hint');
        server.start.bind(server)();
    });
});

gulp.task('test', function() {
    return gulp.src(['test/test.js'], { read: false })
    .pipe(mocha({reporter: 'list'}))
    .on('error', function() {
        process.exit(1);
    });
});

gulp.task('hint', function(){
    return gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
})

