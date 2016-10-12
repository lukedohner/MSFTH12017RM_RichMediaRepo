var gulp = require( 'gulp' ),
    connect = require( 'gulp-connect' ),
    open = require( 'gulp-open' ),
    compass = require( 'gulp-compass' ),
    plumber = require( 'gulp-plumber' ),
    jshint = require( 'gulp-jshint' ),
    watch = require( 'gulp-watch' ),
    clean = require( 'gulp-clean' ),
    copy = require( 'gulp-copy' ),
    inline = require( 'gulp-inline' ),
    uglify = require( 'gulp-uglify' ),
    minifyCSS = require( 'gulp-minify-css' ),
    replace = require( 'gulp-replace' ),
    htmlmin = require( 'gulp-htmlmin' ),
    zip = require( 'gulp-zip' ),
    argv = require( 'yargs' ).argv,
    jasmine = require('gulp-jasmine'), 
    notify = require('gulp-notify');

var src = './src',
    dist = './dist',
    srcRichload = src + '/richLoads/richload',
    distBase = dist + '/base',
    distRichload = dist + '/richload',
    baseURL = ( argv.production === undefined ) ? src : dist,
    port = ( argv.production === undefined ) ? 8000 : 8001,
    uri = 'http://localhost:' + port;

gulp.task( 'default', [ 'serve' ] );
gulp.task( 'serve', [ 'connect', 'open', 'watch' ] );
gulp.task( 'build', [ 'clean', 'copyBase', 'copy', 'sass', 'inlineBase', 'inline', 'replaceBase', 'replace', 'htmlminBase', 'htmlmin', 'compressBase', 'compress', 'testProd' ] );

gulp.task( 'test', function() {
    gulp.src('tests/test.js')
        .pipe(jasmine())
        .on('error', notify.onError({
            title: 'Jasmine Test Failed', 
            message: 'One or more tests failed, see cli for details.'
        }));
} );


gulp.task( 'testProd',['compressBase', 'compress'], function() {
    gulp.src('tests/test.js')
        .pipe(jasmine())
        .on('error', notify.onError({
            title: 'Jasmine Test Failed', 
            message: 'One or more tests failed, see cli for details.'
        }));
} );

gulp.task( 'connect', function() {
    connect.server( {
        root: baseURL,
        livereload: true,
        port: port
    } );
} );


gulp.task( 'open', function() {
    var options = {
        uri: uri,
        app: 'google chrome' // may need to sniff for Windows/OSX to determine Chrome string
    };
    gulp.src( './' )
        .pipe( open( options ) );
});

gulp.task( 'html', function () {
    gulp.src( src + '/**/*.html' )
        .pipe( connect.reload() );
});

gulp.task( 'sass', function( done ) {
    gulp.src( './sass/*.scss' )
        .pipe( plumber( {
            errorHandler: function ( error ) {
                console.log( error.message );
                this.emit( 'end' );
            }
        } ) )
        .pipe( compass( {
            css: srcRichload + '/css',
            sass: './sass',
            image: srcRichload + '/img',
            style: 'nested'
        } ) )
        .on( 'error', function( error ) {
            console.log( error.message ); 
        } )
        .pipe( gulp.dest( srcRichload + '/css' ) )
        .on('end', function () { done(); });
});

gulp.task( 'lint', function() {
    return gulp.src( srcRichload + '/js/*.js' )
               .pipe( jshint() )
               .pipe( jshint.reporter( 'default' ) )
               .pipe( connect.reload() );
});

gulp.task( 'watch', function() {
    gulp.watch( [ src + '/**/*.html' ], [ 'html' ] );
    gulp.watch( [ './sass/*.scss' ], [ 'sass' ] );
    gulp.watch( [ src + '/**/*.js' ], [ 'lint' ] );
});

gulp.task( 'clean', function () {
    return gulp.src( dist + '/**/*', { read: false } )
               .pipe( clean() );
});

gulp.task( 'copyBase', [ 'clean' ], function() {

    return gulp.src( [ src + '/img/**/*.{jpg,png,gif,svg}', src + '/manifest.js' ] )
               .pipe( copy( distBase, { prefix: 2 } ) );
});

gulp.task( 'copy', [ 'clean' ], function() {

    return gulp.src( srcRichload + '/**/*.{jpg,png,gif,svg}' )
               .pipe( copy( distRichload, { prefix: 4 } ) );
});

gulp.task( 'inlineBase', [ 'copy' ], function( done ) {
    gulp.src( src + '/index.html' )
        .pipe( inline( {
            base: src,
            js: uglify,
            css: minifyCSS,
            disabledTypes: [ 'img' ]
    } ) )
    .pipe( gulp.dest( distBase ) )
    .on('end', function () { done(); });
});

gulp.task( 'inline', [ 'sass' ], function( done ) {
    gulp.src( srcRichload + '/index.html' )
        .pipe( inline( {
            base: srcRichload,
            js: uglify,
            css: minifyCSS,
            disabledTypes: [ 'img' ]
    } ) )
    .pipe( gulp.dest( distRichload ) )
    .on('end', function () { done(); });
});

gulp.task( 'replaceBase', [ 'inlineBase' ], function( done ) {
 gulp.src( [ distBase + '/index.html' ] )
     .pipe( replace( 'img/', './') )
      .pipe( replace( '../img/', './') )
     .pipe( gulp.dest( distBase ) )
     .on('end', function () { done(); });
});

gulp.task( 'replace', [ 'inline' ], function( done ) {
    gulp.src( [ distRichload + '/index.html' ] )
        .pipe( replace( 'img/', './') )
        .pipe( replace( '../img/', './') )
        .pipe( gulp.dest( distRichload ) )
        .on('end', function () { done(); });
});

gulp.task('htmlminBase', [ 'replaceBase' ], function() {
  return gulp.src( distBase + '/index.html' )
          .pipe( htmlmin( { collapseWhitespace: true, removeComments: true } ) )
          .pipe( gulp.dest( distBase ) );
});

gulp.task('htmlmin', [ 'replace' ], function() {
  return gulp.src( distRichload + '/index.html' )
             .pipe( htmlmin( { collapseWhitespace: true, removeComments: true } ) )
             .pipe( gulp.dest( distRichload ) );
});

gulp.task( 'compressBase', [ 'clean', 'copyBase', 'inlineBase', 'replaceBase', 'htmlminBase' ], function() {
 return gulp.src(  distBase + '/*' )
            .pipe( zip( 'Beowulf_970x250_base.zip' ) )
            .pipe( gulp.dest( './' ) );
});

gulp.task( 'compress', [ 'clean', 'copy','sass', 'inline', 'replace', 'htmlmin' ], function() {
    return gulp.src(  distRichload + '/*' )
               .pipe( zip( 'Beowulf_970x250_richload.zip' ) )
               .pipe( gulp.dest( './' ) );
});