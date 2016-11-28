'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('del');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var wrap = require('gulp-wrap');
var watch = require('gulp-watch');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('clean', function() {
  return clean('dist');
});

gulp.task('index', function() {
  var target = gulp.src('src/index.html');
  return target.pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('templates', function() {
  return gulp.src('src/**/*tpl.html')
    .pipe(rename({dirname: ''}))
    .pipe(templateCache('templates.js', {root: 'templates', standalone: true}))
    .pipe(wrap(';!function(){\n\'use strict\';\n<%= contents %>\n}();'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('favicon', function() { //must have!
  return gulp.src('src/favicon.ico')
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', gulp.series('build'));
});

gulp.task('build', gulp.series('clean','index', 'favicon', 'js', 'templates', 'css'));
gulp.task('dev', gulp.series('build', 'watch'));