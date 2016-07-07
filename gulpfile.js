var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var gnf = require('gulp-npm-files');
var watch = require('gulp-watch');
var debug = require('gulp-debug');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');

var tsFiles = ['src/**/*.ts', 'typings/index.d.ts'];
var rsFiles =['src/**/*', '!**/*.ts', '!**/*.*___jb_tmp___'];

gulp.task('clean', function(cb) {
  return del(['build'], cb);
});

//var tsProject = ts.createProject('tsconfig.json');
//
//gulp.task('compile', function() {
//    var tsResult = gulp.src(tsFiles)
//      .pipe(debug({ title: 'compile: '}))
//      .pipe(ts(tsProject));
//
//    tsResult.js.pipe(gulp.dest('build'));
//});

gulp.task('compile', shell.task(['tsc']));

gulp.task('compile:watch', ['compile'], function() {
  gulp.watch(tsFiles, ['compile']);
});

gulp.task('rs', function() {
  return gulp.src(rsFiles)
    //.pipe(debug({ title: 'rs: '}))
    .pipe(gulp.dest('build'))
});

gulp.task('rs:watch', function() {
  return watch(rsFiles, { ignoreInitial: false })
    .pipe(debug({ title: 'rs: '}))
    .pipe(gulp.dest('build'))
});

gulp.task('lib', function() {
  gulp.src(gnf(), { base: 'node_modules' })
    .pipe(gulp.dest('build/node_modules'));
});

gulp.task('watch', ['compile:watch', 'rs:watch']);

gulp.task('default', function(cb) {
  runSequence('clean', ['compile', 'rs', 'lib'], cb);
});

