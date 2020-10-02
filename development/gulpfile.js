var {series, src, dest, watch} = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

function scss() {
	var stream = src('../assets/scss/*.scss');
	return streamPipes(stream);
}

function streamPipes(stream) {
	return stream
		.pipe(changed('../assets/css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(["last 5 version"], {
            cascade: false
        }))
        .pipe(cleanCSS())
		.pipe(dest('../assets/css'));
}

function watcher() {
	return watch(['../assets/scss/*.scss'], scss);
}

exports.scss = scss;
exports.watch = series(scss, watcher);