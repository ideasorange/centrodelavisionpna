// jshint ignore: start
'use strict';

const gulp = require('gulp');
const { series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

gulp.task('testing', async function() {
  console.log('*******************************');
  console.log('Hi Juan this is a testing task!');
  console.log('*******************************');
});

/**
 * Locations (Sources and Destinations)
 */
const settings = {
  // Where SASS files are and which exclusions you want.
  sassSrcFiles: 'scss/**/*.scss',
  sassCompSrcFiles: 'components/**/*.scss',
  sassDestFiles: './dist/css',
  sassCompDestFiles: 'components/',
  jsSrcDirs: ['js/**/*.js', '!js/**/*.min.js'],
  jsCompSrcDirs: ['components/**/*.js', '!components/**/*.min.js']
};

function buildStyles() {
  return gulp.src(settings.sassSrcFiles)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['./node_modules/breakpoint-sass/stylesheets', 'scss']
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.sassDestFiles));
};

function buildStylesComponents() {
  return gulp.src(settings.sassCompSrcFiles)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['./node_modules/breakpoint-sass/stylesheets', 'scss']
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.sassCompDestFiles));
};

// exports.buildStyles = buildStyles;
// exports.watch = function () {
//   gulp.watch(settings.sassSrcFiles, buildStyles);
// };

/**
 * Watcher.
 */
function watcherTask() {
  buildStyles();
  gulp.watch(settings.sassSrcFiles, buildStyles);
  //gulp.watch(settings.jsSrcDirs, buildTask);
}

/**
 * Watcher task on components.
 */
function watcherTaskComponents() {
  buildStylesComponents();
  gulp.watch(settings.sassCompSrcFiles, buildStylesComponents);
  //gulp.watch(settings.jsCompSrcDirs, buildStylesComponents);
}

exports.buildStyles = buildStyles;
exports.buildStylesComponents = buildStylesComponents;
exports.build = parallel(buildStyles, buildStylesComponents);
exports.watch = parallel(watcherTask, watcherTaskComponents);
