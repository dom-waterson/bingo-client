(function () {
    'use strict';
   module.exports ={
       unit: {
           configFile : 'karma.conf.js',
           options:{
               files : [
                   'bower_components/angular/angular.js',
                   'bower_components/angular-ui-router/release/angular-ui-router.js',
                   'bower_components/angular-mocks/angular-mocks.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                   'main-app/app/scripts/main.js',
                   //then controllers, services, directives
                   'main-app/tests/mocks/mocks.js',
                   'main-app/app/scripts/**/*.js',
                   'main-app/tests/**/*.js'
               ]
           }
       }
   };
})();