(function () {
    'use strict';
    angular.module('Tombola.BingoClient')
        .run(function ($rootScope, $state, TokenService) {
            $rootScope.$on('$locationChangeSuccess', function () {
                if (!TokenService.isAuthenticated()) {
                    $state.go('login');
                }
            });
        });
})();
