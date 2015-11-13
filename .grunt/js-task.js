(function() {
    'use strict';
    module.exports = {
        checkmainjs: {
            src: ['main-app/app/scripts/**/*.js', 'main-app/tests/**/*.js'],
            options: {
                '-W030': true,
                'globals'   : {
                    'describe'   : false,
                    'it'         : false,
                    'before'     : false,
                    'beforeEach' : false,
                    'after'      : false,
                    'afterEach'  : false,

                }
            }
        },
        checkgruntjs: {
            src: ['.grunt/**/*.js']
        }
    };
})();
