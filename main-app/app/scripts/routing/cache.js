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
                '<div ng-init="game.nextGame()"><h1>Balance: {{game.user.currentBalance | currency:"£"}}</h1>'+
                    '<h1>Username: {{game.user.name}}</h1>' +
                '<button ng-click="logCrtl.logout()">Logout</button>' +
                    '<h1>Time Till Next Game: {{nextGameModel.timeToGame}}</h1>'+
                '<button ng-click="game.buyTicket()">Buy Ticket{{game.ticketPrice}}</button> ' +
                '<div ng-controller="loginController as logCrtl">' +
                '</div>' +
                '</div>');

            $templateCache.put('bingoTicket.html',
            '<div ng-controller="loginController as logCrtl">' +
            '<button ng-click="logCrtl.logout()">Logout</button>' +
            '<button ui-sref="lobby">Lobby</button>' +
            '</div><bingo-ticket></bingo-ticket>');
        }]);
})();
