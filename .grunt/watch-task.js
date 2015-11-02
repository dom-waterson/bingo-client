(function () {
    'use strict';
    module.exports = {
        less: {
            files: ['main-app/app/less/*.less'],
            tasks: ['lessFiles']
        },
        javascript: {
            files: ['main-app/app/scripts/**/*.js'],
            tasks: ['jsFiles']
        },
        html: {
            files: ['main-app/app/index.html','main-app/app/html/**/*.html'],
            tasks: ['htmlFiles']
        }
    };
})();