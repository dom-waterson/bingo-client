(function () {
    'use strict';
    angular.module('Tombola.BingoClient')
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('login.html',
                '<div class="mainContent" ng-controller="loginController as logCrtl"> ' +
                    '<input ng-model="logCrtl.userName" type="text"><br/>' +
                    '<input ng-model="logCrtl.userPassword" type="password"><br/>' +
                    '<button ng-click="logCrtl.login()">Login</button> ' +
                '</div>');

            $templateCache.put('lobby.html',
                '<div> ' +
                '<button ng-click="game.nextGame()">Next Game</button> ' +
                '<h2>{{game.nextGameTime}}</h2> ' +
                '<h2>Ticket Price: {{game.ticketPrice}}</h2> ' +
                '<button ng-click="game.buyTicket()">Buy Ticket</button> ' +
                '<div ng-controller="loginController as logCrtl">' +
                '<button ng-click="logCrtl.logout()">Logout</button>' +
                '</div>' +
                '</div>');

            $templateCache.put('bingoTicket.html',
                '<bingo-ticket></bingo-ticket>'+
                '<div ng-controller="loginController as logCrtl">' +
                    '<button ng-click="logCrtl.logout()">Logout</button>' +
                '</div>');
        }]);
})();
