/* Gulpfile for ng-coding */
/* Provides SASS + Livereload functions */
/* Copyright (C) 2014, Uri Shaked. License: ISC */
'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connectLivereload = require('connect-livereload'),
	jshint = require('gulp-jshint'),
	browserify = require('gulp-browserify'),
	html = require('html-browserify'),
	rename = require('gulp-rename'),
	stylish = require('jshint-stylish'),
	express = require('express');

var serverPort = process.env.GDG_DEVSERVER_PORT || 7100;
var livereloadPort = process.env.GDG_LIVERELOAD_PORT || 35732;

var paths = {
	styles: ['web/styles/*.scss'],
	scripts: ['web/scripts/{**/,}*.js'],
	entryPoint: ['web/modules/main/main.js'],
	serverScripts: ['src/**/*.js', 'config/**/*.js', 'app.js'],
	buildScripts: ['gulpfile.js'],
	html: ['web/**/*.html']
};

var build = {
	styles: 'web/build/styles'
};

gulp.task('sass', function () {
	gulp.src(paths.styles)
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest(build.styles));
});

gulp.task('browserify', function() {
	gulp.src(paths.entryPoint, { read: false })
		.pipe(browserify({
			insertGlobals: true,
			debug: true,
			transform: html
		}))
		.pipe(rename('ngCoding.js'))
		.pipe(gulp.dest('web/build'));
});

gulp.task('serve', ['sass', 'browserify'], function () {
	var app = express();
	app.use(connectLivereload({
		port: livereloadPort
	}));
	app.use(require('./src/app')());
	app.listen(serverPort);
});

gulp.task('lint', function () {
	return gulp.src([].concat(paths.scripts, paths.serverScripts, paths.buildScripts))
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {
	var lrserver = livereload(livereloadPort);

	gulp.src(paths.styles)
		.pipe(watch())
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest(build.styles))
		.pipe(lrserver);

	gulp.src([].concat(paths.html, paths.scripts))
		.pipe(watch())
		.pipe(lrserver);
});

gulp.task('default', ['serve', 'watch', 'lint']);
