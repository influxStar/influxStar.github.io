const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('default', ['scripts', 'styles', 'cp-html', 'cp-img'], function () {
    gulp.watch('./css/**/*.scss', ['styles']);
    gulp.watch('./js/**/*.js', ['scripts']);
    gulp.watch('./index.html', ['cp-html']);
    gulp.watch('./dist/index.html').on('change', browserSync.reload);
    browserSync.init({
        server: "./dist"
    });
});

gulp.task('dist', ['scripts-dist', 'styles', 'cp-html', 'cp-img']);

gulp.task('scripts', function() {
    gulp.src('js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('scripts-dist', function() {
    gulp.src('js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
});

gulp.task('styles', function() {
    gulp.src('css/styles.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('Error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('cp-html', function() {
    gulp.src('*.html')
        .pipe(gulp.dest('dist/'))
});

gulp.task('cp-img', function() {
    gulp.src('favicon.ico').pipe(gulp.dest('dist/'));
    gulp.src(['img/**/*.ico', 'img/**/*.jpg', 'img/**/*.png'])
        .pipe(gulp.dest('dist/img'));
});