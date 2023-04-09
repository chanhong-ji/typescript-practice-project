import gulp from 'gulp';
import gpug from 'gulp-pug';
import { deleteAsync } from 'del';
import ws from 'gulp-webserver';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import miniCSS from 'gulp-csso';
import bro from 'gulp-bro';
import babelify from 'babelify';
import rename from 'gulp-rename';
import image from 'gulp-image';

const sass = gulpSass(dartSass);

const routes = {
    pug: {
        watch: 'src/**/*.pug',
        src: 'src/templates/*.pug',
        dest: 'build',
    },
    scss: {
        watch: 'src/scss/**/*.scss',
        src: 'src/scss/style.scss',
        dest: 'build/css',
    },
    img: {
        src: 'src/images/*',
        dest: 'build/images',
    },
    ts: {
        watch: 'src/ts/**/*.ts',
        src: 'src/ts/main.ts',
        dest: 'build/js',
    },
};

const clean = async () => deleteAsync(['build']);

const pug = () =>
    gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const style = () =>
    gulp
        .src(routes.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(miniCSS())
        .pipe(gulp.dest(routes.scss.dest));

const ts = () =>
    gulp
        .src(routes.ts.src)
        .pipe(
            bro({
                transform: [
                    [
                        'babelify',
                        {
                            extensions: ['.ts'],
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript',
                            ],
                        },
                    ],
                    // ['uglifyify', { global: true }],
                ],
                // plugin: [['tsify']],
            })
        )
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest(routes.ts.dest));

const img = () =>
    gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

const webserver = () =>
    gulp.src('build').pipe(ws({ livereload: true, open: true }));

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.scss.watch, style);
    gulp.watch(routes.ts.watch, ts);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([ts, style, pug]);

const live = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, live]);
