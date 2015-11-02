(function() {
    'use strict';
    var copyTask = require('./.grunt/copy-task'),
        lessTask = require('./.grunt/less-task'),
        jsTask = require('./.grunt/js-task'),
        jsConcat = require('./.grunt/js-concat'),
        cleanTask = require('./.grunt/clean-task'),
        watchTask = require('./.grunt/watch-task'),
        karmaTask = require('./.grunt/karma-task'),
        port = 35008;
    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            copy: copyTask,
            lesslint: lessTask,
            less: lessTask,
            jshint: jsTask,
            concat: jsConcat,
            clean: cleanTask,
            watch: watchTask,
            karma: karmaTask
        });
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-lesslint');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-express-server');
        grunt.loadNpmTasks('grunt-karma');

        grunt.registerTask('server', 'Start a custom web server', function (){
            var server = require('./.grunt/server.js');
            server.listen(port);
            grunt.log.writeln('Listening on port ' + port);
        });
        grunt.registerTask('lessFiles', ['lesslint', 'clean:css', 'less']);
        grunt.registerTask('jsFiles', ['jshint', 'clean:javascript', 'concat' ]);
        grunt.registerTask('htmlFiles', ['clean:html', 'copy:mainapphtml']);
        grunt.registerTask('test', ['jsFiles', 'karma']);
        grunt.registerTask('default', ['copy', 'lessFiles', 'jsFiles', 'server' ,'watch']);
    };
})();
