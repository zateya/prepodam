var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-csso');
var sourcemap = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var del = require('del');
var ghpages = require("gh-pages");
var server = require('browser-sync').create();

gulp.task('clean', function () {
    return del('build');
});

gulp.task('copy', function () {
    return gulp.src([
        'src/fonts/**/*.*',
        'src/images/*.{png,jpg,svg}',
        'src/images/tmp/*.*',
        'src/js/**',
        'src/*.ico'
    ], {
        base: 'src'
    })
        .pipe(gulp.dest('build'));
});

gulp.task('css', function () {
    return gulp.src('src/styles/styles.scss')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('build/css'))
        .pipe(minifyCSS())
        .pipe(rename('styles.min.css'))
        .pipe(sourcemap.write('../maps'))
        .pipe(gulp.dest('build/css'))
        .pipe(server.stream());
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(server.stream());
});

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/js'))
        .pipe(server.stream());
});

gulp.task('serve', function () {
    server.init({
        server: 'build/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch('src/styles/**/*.{scss,sass}', gulp.series('css'));
    gulp.watch('src/**/*.html', gulp.series('html'));
    gulp.watch('src/js/*.js', gulp.series('js'));
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'html'));
gulp.task('start', gulp.series('build', 'serve'));

ghpages.publish("build");
