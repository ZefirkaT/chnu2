const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Компіляція SASS в CSS для режиму Debug
gulp.task('debug', function () {
    return gulp.src('/Users/user/Desktop/chnu/style/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('/Users/user/Desktop/chnu/css/debug'));
});

// Компіляція та мініфікація SASS в CSS для режиму Production
gulp.task('production', function () {
    return gulp.src('/Users/user/Desktop/chnu/style/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('/Users/user/Desktop/chnu/css/production'));
});

// Стеження за змінами у файлах SASS для обох режимів
gulp.task('watch', function () {
    gulp.watch('/Users/user/Desktop/chnu/style/style.scss', gulp.parallel('debug', 'production'));
});

// Завдання за замовчуванням (запускає компіляцію та слідкування за змінами)
gulp.task('default', gulp.series('debug', 'production', 'watch'));
