(function () {
    'use strict';
    angular.module('Tombola.BingoClient')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/login");
            $stateProvider
                .state('login', {
                    url: "/login",
                    templateProvider: function ($templateCache) {
                        return $templateCache.get('login.html');
                    }
                })
                .state('lobby', {
                url: "/lobby",
                templateProvider: function ($templateCache) {
                    return $templateCache.get('lobby.html');
                }
            })
                .state('playing', {
                url: '/playing',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('bingoTicket.html');
                }
            });
        }]);
})();
