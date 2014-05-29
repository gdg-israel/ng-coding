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
	scripts: ['web/scripts/**/*.js'],
	html: ['web/**/*.html']
};

var build = {
	styles: 'build/styles'
};

gulp.task('sass', function () {
	gulp.src(paths.styles)
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest('web/build/styles'));
});

gulp.task('serve', ['sass'], function () {
	var app = express();
	app.use(connectLivereload({
		port: livereloadPort
	}));
	var config = require('./config/config');
	app.use(express.static('web'));
	require('./config/express')(app, config);
	require('./config/routes')(app);
	app.listen(serverPort);
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

gulp.task('default', ['serve', 'watch']);
