(function () {
    'use strict';
    angular.module('Tombola.BingoClient')
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('login.html',
                '<div class="loginContainer" ng-controller="loginController as logCrtl"> ' +
                    '<input class="inputSize" ng-model="logCrtl.userName" type="text"><br/>' +
                    '<input class="inputSize" ng-model="logCrtl.userPassword" type="password"><br/>' +
                    '<button class="loginButton" ng-click="logCrtl.login()">Login</button> ' +
                '</div>');

            $templateCache.put('lobby.html',
                '<div class="userInfo">'+
                    '<h1 class="userBalance">Username: {{game.user.name}}</h1>' +
                    '<h1 class="userBalance">Balance: {{game.user.currentBalance | currency:"£"}}</h1>'+
                    '<button ng-controller="loginController as logCrtl" ng-click="logCrtl.logout()">Logout</button>' +
                '</div>'+
                '<div ng-init="game.nextGame()">'+
                    '<h1 class="title">Time Till Next Game:</h1>'+
                    '<h1 class="counter">{{nextGameModel.timeToGame}}</h1>'+
                    '<button class="buttonCenter" ng-click="game.buyTicket()">Buy Ticket {{game.ticketPrice}}P</button> ' +
                '</div>');

            $templateCache.put('bingoTicket.html',
                '<div ng-controller="loginController as logCrtl">' +
                    '<button ng-click="logCrtl.logout()">Logout</button>' +
                    '<button ui-sref="lobby">Lobby</button>' +
                '</div>' +
                '<bingo-ticket></bingo-ticket>');
        }]);
})();
