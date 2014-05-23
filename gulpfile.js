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
	express = require('express');

var serverPort = process.env.GDG_DEVSERVER_PORT || 7100;
var livereloadPort = process.env.GDG_LIVERELOAD_PORT || 35732;

var paths = {
	styles: ['web/styles/*.scss'],
	html: ['web/*.html']
};

var build = {
	styles: 'build/styles'
};

gulp.task('sass', function () {
	gulp.src(paths.styles)
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest('build/styles'));
});

gulp.task('serve', ['sass'], function () {
	var server = express();
	server.use(connectLivereload({
		port: livereloadPort
	}));
	server.use(express.static('web'));
	server.listen(serverPort);
});

gulp.task('watch', function () {
	var lrserver = livereload(livereloadPort);

	gulp.src(paths.styles)
		.pipe(watch())
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest(build.styles))
		.pipe(lrserver);

	gulp.src(paths.html)
		.pipe(watch())
		.pipe(lrserver);
});

gulp.task('default', ['serve', 'watch']);
