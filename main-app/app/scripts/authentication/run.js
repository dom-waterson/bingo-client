(function () {
    'use strict';
    angular.module('Tombola.BingoClient')
        .run(function($rootScope, $state, tokenService) {
            $rootScope.$on('$locationChangeSuccess', function() {
                if(!tokenService.isAuthenticated()){
                    $state.go('login');
                }
            });
        });
})();
