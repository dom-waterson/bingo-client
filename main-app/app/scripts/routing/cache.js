(function () {
    'use strict';
    angular.module('Tombola.BingoClient')
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('login.html',
                '<div class="mainContent" ng-controller="loginController as logCrtl"> ' +
                    '<input ng-model="logCrtl.userName" type="text">' +
                    '<input ng-model="logCrtl.userPassword" type="password">' +
                    '<button ng-click="logCrtl.login()">Login</button> ' +
                '</div>');

            $templateCache.put('lobby.html',
                '<div ng-controller="gameController as game"> ' +
                '<button ng-click="game.nextGame()">Next Game</button> ' +
                '<h2>{{game.nextGameTime}}</h2> ' +
                '<h2>Ticket Price: {{game.ticketPrice}}</h2> ' +
                '<button ng-click="game.buyTicket()">Buy Ticket</button> ' +
                '<div ng-controller="loginController as logCrtl">' +
                '<button ng-click="logCrtl.logout()">Logout</button>' +
                '</div>' +
                '</div>');

            $templateCache.put('bingoTicket.html',
                '<h1>bingo Ticket</h1>');
        }]);
})();
